//------------------------------------------------------------------------------
// <auto-generated>
//     Ce code a été généré à partir d'un modèle.
//
//     Des modifications manuelles apportées à ce fichier peuvent conduire à un comportement inattendu de votre application.
//     Les modifications manuelles apportées à ce fichier sont remplacées si le code est régénéré.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WebApplication1.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class EC_Command
    {
        public int C_id { get; set; }
        public string loginUser { get; set; }
        public int idProduct { get; set; }
        public string C_status { get; set; }
        public System.DateTime CommandDate { get; set; }
    
        public virtual EC_Product EC_Product { get; set; }
        public virtual EC_User EC_User { get; set; }
    }
}
