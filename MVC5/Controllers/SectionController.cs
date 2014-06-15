using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using MVC5.Models;

namespace MVC5.Controllers
{
    public class SectionController : BaseController
    {
        private PublicationEntities db = new PublicationEntities();

        // GET: /Section/
        public ActionResult Index(int id)
        {
            var book = db.Books.Find(id);
            var sections = book.Sections;
            return View(sections.ToList());
        }

        public ActionResult Book(int id)
        {
            var book = db.Books.Find(id);
            var sections = book.Sections;
            ViewBag.firstSectionId = sections.First().SectionId;
            return View(sections.ToList());
        }

        //API GET /Section/GetSelectedSection/1
        public JsonResult GetSelectedSection(int id)
        {
            var section = db.Sections.Find(id);
            return Json(new {
                                id = section.SectionId,
                                section = section.Section1,
                                title = section.TitleAl,
                                desc = section.DescriptionAl,
                                html1 = section.html1Al,
                                html2 = section.html2Al
                            }, JsonRequestBehavior.AllowGet);
        }

        //API GET /Section/GetSelectedSectionEn/1
        public JsonResult GetSelectedSectionEn(int id)
        {
            var section = db.Sections.Find(id);
            return Json(new
            {
                id = section.SectionId,
                section = section.Section1,
                title = section.TitleEn,
                desc = section.DescriptionEn,
                html1 = section.html1En,
                html2 = section.html2En
            }, JsonRequestBehavior.AllowGet);
        }
        // API GET /Section/GetTablesOfSecton/1
        public JsonResult GetTablesOfSection(int id)
        {
            var section = db.Sections.Find(id);
            var tables = section.Tables;

            return Json(tables.Select(t => new { 
                        id = t.TableId,
                        metadataUrl = t.TableMetadataUrlAl,
                        query = t.TableQuery,
                        order = t.TableOrder,
                        contents = t.NumberOfContents,
                        section = t.SectionId,
                        cols = t.Cols,
                        rows = t.Rows,
                        title = t.TitleAl,
                        hiddenAttributes = t.HiddenAttributesAl
            }), JsonRequestBehavior.AllowGet);
        }

        // API GET /Section/GetTablesOfSectonEn/1
        public JsonResult GetTablesOfSectionEn(int id)
        {
            var section = db.Sections.Find(id);
            var tables = section.Tables;

            return Json(tables.Select(t => new
            {
                id = t.TableId,
                metadataUrl = t.TableMetadataUrlEn,
                query = t.TableQuery,
                order = t.TableOrder,
                contents = t.NumberOfContents,
                section = t.SectionId,
                cols = t.ColsEn,
                rows = t.RowEn,
                title = t.TitleEn,
                hiddenAttributes = t.HiddenAttributesEn
            }), JsonRequestBehavior.AllowGet);
        }

        //API GET /Section/GetGraphOfSection/1
        public JsonResult GetGraphOfSection(int id)
        {
            var section = db.Sections.Find(id);
            var graphs = section.Graphs;

            return Json(graphs.Select(g => new
            {
                id = g.GraphId,
                title = g.GraphTitleAl,
                metadataUrl = g.GraphTableUrlAl,
                query = g.GraphTableQuery,
                order = g.GraphOrder,
                sectionid = g.SectionId,
                type = g.GraphTypeId,
                colseries = g.ColSeriesNo,
                colticks = g.ColTicksNo
            }), JsonRequestBehavior.AllowGet);
        }

            //API GET /Section/GetGraphOfSection/1
        public JsonResult GetGraphOfSectionEn(int id)
        {
            var section = db.Sections.Find(id);
            var graphs = section.Graphs;

            return Json(graphs.Select(g => new
            {
                id = g.GraphId,
                title = g.GraphTitleEn,
                metadataUrl = g.GraphTableUrlEn,
                query = g.GraphTableQuery,
                order = g.GraphOrder,
                sectionid = g.SectionId,
                type = g.GraphTypeId,
                colseries = g.ColSeriesNo,
                colticks = g.ColTicksNo
            }), JsonRequestBehavior.AllowGet);
        }

        // GET: /Section/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Section section = db.Sections.Find(id);
            if (section == null)
            {
                return HttpNotFound();
            }
            return View(section);
        }

        // GET: /Section/Create
        public ActionResult Create()
        {
            ViewBag.ChapterId = new SelectList(db.Books, "BookId", "TitleAl");
            return View();
        }

        // POST: /Section/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include="SectionId,ChapterId,TitleAl,TitleEn,DescriptionAl,DescriptionEn")] Section section)
        {
            if (ModelState.IsValid)
            {
                db.Sections.Add(section);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.ChapterId = new SelectList(db.Books, "BookId", "TitleAl", section.BookId);
            return View(section);
        }

        // GET: /Section/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Section section = db.Sections.Find(id);
            if (section == null)
            {
                return HttpNotFound();
            }
            ViewBag.ChapterId = new SelectList(db.Books, "BookId", "TitleAl", section.BookId);
            return View(section);
        }

        // POST: /Section/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include="SectionId,ChapterId,TitleAl,TitleEn,DescriptionAl,DescriptionEn")] Section section)
        {
            if (ModelState.IsValid)
            {
                db.Entry(section).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.ChapterId = new SelectList(db.Books, "BookId", "TitleAl", section.BookId);
            return View(section);
        }

        // GET: /Section/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Section section = db.Sections.Find(id);
            if (section == null)
            {
                return HttpNotFound();
            }
            return View(section);
        }

        // POST: /Section/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Section section = db.Sections.Find(id);
            db.Sections.Remove(section);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
