//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MVC5.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Section
    {
        public Section()
        {
            this.Graphs = new HashSet<Graph>();
            this.Tables = new HashSet<Table>();
        }
    
        public int SectionId { get; set; }
        public string TitleAl { get; set; }
        public string TitleEn { get; set; }
        public string DescriptionAl { get; set; }
        public string DescriptionEn { get; set; }
        public Nullable<int> Section1 { get; set; }
        public Nullable<int> BookId { get; set; }
    
        public virtual ICollection<Graph> Graphs { get; set; }
        public virtual ICollection<Table> Tables { get; set; }
        public virtual Book Book { get; set; }
    }
}
