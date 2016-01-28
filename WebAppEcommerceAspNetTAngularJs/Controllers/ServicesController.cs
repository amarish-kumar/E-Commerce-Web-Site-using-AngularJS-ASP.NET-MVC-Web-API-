using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;
using System.Web.Services;

namespace WebApplication1.Controllers
{
    public class ServicesController : ApiController
    {
        
        WebApplication1.Models.Entities1 dataContext = new Models.Entities1();
        //User 
        [HttpGet]
        public string userExist()
        {   
            string res = "false";
            try
            {
                //get current Http Request
                HttpRequest request = HttpContext.Current.Request;
                //get parameters seneded by client
                var login = request.Params["loginUser"];
                var mp = request.Params["mp"];
                //fetch into EC_User table, if that exists user that have the same loginUser and password
                var _user = dataContext.EC_User.Where(x => x.loginUser == login && x.mpUser == mp).First();
                if (_user != null) {
                    //create a new session by saving current user login into session variable
                    if (System.Web.HttpContext.Current.Session["login"] == null)
                    {
                        System.Web.HttpContext.Current.Session["login"] = login.ToString();
                    }
                    return _user.C_Type;
                }
            }
            catch (Exception e)
            {
                ;
             }
            return res;
          /*  System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            List<Dictionary<string, string>> rows = new List<Dictionary<string, string>>();
            Dictionary<string, string> row = new Dictionary<string, string>();
            row.Add("x", "f");
            rows.Add(row);
            return serializer.Serialize(rows);*/
        }
        [HttpGet]
        public void disconnect()
        {   
            //destroy session
            System.Web.HttpContext.Current.Session["login"] = null;
        }
        [HttpGet]
        public Boolean insertUser()
        {
            Boolean res = true;
            try
            {       
                //get current Http Request
                HttpRequest request = HttpContext.Current.Request;
                //get parameters seneded by client
                var loginUser =  request.Params["loginUser"];
                var mpUser = request.Params["mpUser"];
                //As default the new member is simple user of application
                var _Type = "U";
                //save a new user into EC_User table
                var _user = new Models.EC_User();
                _user.loginUser = loginUser;
                _user.mpUser = mpUser;
                _user.C_Type = _Type;
                dataContext.EC_User.Add(_user);
                dataContext.SaveChanges();
            }
            catch (Exception e)
            {
                res = false;
            }
            return res;
        }
        //end user
        //Product
        public class ProducTRecord
        {
           public int idProduct;
           public string imageProduct;
           public string nameProduct;
           public string descriptionProduct;
           public int price;
        }

        [HttpGet]
        public IEnumerable<ProducTRecord> ProductsList()
        {
            //get all available product in EC_Product table 
            var list = dataContext.EC_Product.Select(t => new ProducTRecord { idProduct = t.idProduct, imageProduct = t.imageProduct, descriptionProduct = t.descriptionProduct, nameProduct = t.nameProduct, price = t.price })
                .ToList();
            return list;
        }
  
        [HttpGet]
        public Boolean deleteProduct()
        {
            Boolean res = true;
            try
            {
                //get current Http Request
                HttpRequest request = HttpContext.Current.Request;
                //get parameters seneded by client
                int id = int.Parse(request.Params["id"]);
                //delete a specific product identified by idProduct from EC_Product table
                var product = new WebApplication1.Models.EC_Product { idProduct = id };
                dataContext.EC_Product.Attach(product);
                dataContext.EC_Product.Remove(product);
                dataContext.SaveChanges();
            }
            catch (Exception e)
            {
                res = false;
            }
            return res;
        }
        [HttpPost]   
        public Boolean updateProduct()
        {
            Boolean res = true;
            try
            {
                //get current Http Request
                HttpRequest request = HttpContext.Current.Request;
                //get parameters seneded by client
                HttpPostedFile Productfile = (request.Files.Count>0)?request.Files[0]: null;
                var productKey = int.Parse(request.Params["productKey"]);
                var ProductName = request.Params["ProductName"];
                var ProductDescription = request.Params["ProductDescription"];
                int ProductPrice = int.Parse(request.Params["ProductPrice"]);
                //find specific product by using productKey as identifier for search
                var product = dataContext.EC_Product.Where( x =>  x.idProduct == productKey ).First();
                if (product != null)
                { 
                    product.nameProduct = ProductName;
                    product.descriptionProduct = ProductDescription;
                    product.price = ProductPrice;
                    //saving product image
                    if (Productfile != null )
                    {
                         var imageServerPath = HttpContext.Current.Server.MapPath("~/Content/Images");
                        //creating a unique name
                         imageServerPath = System.IO.Path.Combine(imageServerPath, System.IO.Path.GetRandomFileName().Replace('.', ' ') + System.IO.Path.GetExtension(Productfile.FileName));
                         Productfile.SaveAs(imageServerPath);
                        try
                        {   //delete older image file
                            if (product.imageProduct != null) { 
                                var filePath = HttpContext.Current.Server.MapPath("~/Content/Images");
                                var imagePath = System.IO.Path.Combine(filePath, product.imageProduct);
                                System.IO.File.Delete(imagePath);
                            }
                        }
                        catch (Exception e)
                        {
                            ;
                        }

                        product.imageProduct = System.IO.Path.GetFileName(imageServerPath);
                    }
                    dataContext.SaveChanges();
                }
            }
            catch (Exception e)
            {
                res = false;
            }
            return res;
        }
        [HttpPost]
        public Boolean insertProduct()
        {
            Boolean res = true;
            try
            {
                //get current Http Request
                HttpRequest request = HttpContext.Current.Request;
                //get parameters seneded by client
                HttpPostedFile Productfile = (request.Files.Count > 0) ? request.Files[0] : null;
                var ProductName = request.Params["ProductName"];
                var ProductDescription = request.Params["ProductDescription"];
                int ProductPrice = int.Parse(request.Params["ProductPrice"]);
                //build our delete query
                var product = new WebApplication1.Models.EC_Product();
                //ajout d'image.
                product.nameProduct = ProductName;
                product.descriptionProduct = ProductDescription;
                product.price = ProductPrice;
                //saving a new image product
                if (Productfile != null)
                {
                    var imageServerPath = HttpContext.Current.Server.MapPath("~/Content/Images");
                    imageServerPath = System.IO.Path.Combine(imageServerPath, System.IO.Path.GetRandomFileName().Replace('.', ' ') + System.IO.Path.GetExtension(Productfile.FileName));
                    Productfile.SaveAs(imageServerPath);
                    product.imageProduct =  System.IO.Path.GetFileName(imageServerPath);
                }
                dataContext.EC_Product.Add(product);
                dataContext.SaveChanges();
            }
            catch (Exception e)
            {
                res = false;
            }
            return res;
        }

        //get all commands 
        [HttpGet]
        public Boolean updateCommand()
        {
            Boolean res = true;
            try 
            {
                //get current Http Request
                HttpRequest request = HttpContext.Current.Request;
                //get parameters seneded by client
                var commandId = int.Parse(request.Params["commandId"]);
                var commandStatus = request.Params["status"];
                //find a command by using unique identifier (commandID)
                var command = dataContext.EC_Command.Where(x=> x.C_id == commandId ).First();
                command.C_status = commandStatus;
                dataContext.SaveChanges();
            }
            catch (Exception e)
            {
                res = false;
            }
            return res;
        }
    

        public class CommandRecord
        {
            public int CommandId;
            public string CommandDate;
            public DateTime CMDDate{
                set { CommandDate = value.ToString("dd/MM/yyyy"); }
            }
            public string ProductName;
            public string loginUser;

            public string Status;  
        }

        //change Command state
        [HttpGet]
        public IEnumerable<CommandRecord> CommandsList()
        {
            IEnumerable<CommandRecord> List = null;
            try
            {
                //get current Http Request
                HttpRequest request = HttpContext.Current.Request;
                //get parameters seneded by client
                var login = request.Params["loginUser"];
                if (login != null && login != "")
                {
                    //get current loginUser from login session variable
                    login = System.Web.HttpContext.Current.Session["login"].ToString();
                    //return the list of commands sent by current user
                    List = dataContext.EC_Command.Where(x => x.loginUser == login).Select(x => new CommandRecord { CommandId = x.C_id, loginUser = x.loginUser, CMDDate = x.CommandDate, ProductName = x.EC_Product.nameProduct, Status = x.C_status }).ToList().AsEnumerable();
                }
                else
                {
                    List = dataContext.EC_Command.Select(x => new CommandRecord { CommandId = x.C_id, CMDDate = x.CommandDate, loginUser = x.loginUser, ProductName = x.EC_Product.nameProduct, Status = x.C_status }).ToList();
                }
            }
            catch (Exception e)
            {
                ;
             }
            return List;
        }

        [HttpGet]
        public Boolean insertCommand()
        {
            Boolean res = true;
            try
            {
                //get current Http Request
                HttpRequest request = HttpContext.Current.Request;
                //var status = '0';//int.Parse(request.Params["statu"]);
                dynamic shoppingCart =  JsonConvert.DeserializeObject(request.Params["shoppingcart"]);
                //save all command into EC_Command
                foreach (var elem in shoppingCart)
                { 
                    var command = new Models.EC_Command();
                    command.loginUser = System.Web.HttpContext.Current.Session["login"].ToString();
                    command.idProduct = int.Parse(elem.Name);
                    command.C_status = "Received";
                    command.CommandDate = DateTime.Now;
                    dataContext.EC_Command.Add(command);
                    dataContext.SaveChanges();
                }
            }
            catch (Exception e)
            {
                res = false;
            }
            return res;
        }
        //end command
    }
}
