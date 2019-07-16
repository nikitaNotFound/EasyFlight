using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EasyFlight.Controllers
{
    [Route("planes/[controller]")]
    [ApiController]
    public class PlanesController : Controller
    {
        // GET: Planes
        public ActionResult Index()
        {
            return View();
        }

        // GET: Planes/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Planes/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Planes/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: Planes/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Planes/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: Planes/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Planes/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}