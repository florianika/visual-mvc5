using System.Web;
using System.Web.Optimization;

namespace MVC5
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js",
                        "~/Scripts/jquery.ui.touch-punch.min.js",
                        "~/Scripts/jquery-ui-1.10.4.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js", 
                      "~/Scripts/offcanvas.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css", 
                      "~/Content/offcanvas.css",
                      "~/Content/languages.css"));

            bundles.Add(new StyleBundle("~/Content/jqplot/css").Include(
                    "~/Content/jquery.jqplot.min.css"));

            bundles.Add(new ScriptBundle("~/bundles/jqplot").Include(
                "~/Scripts/jquery.jqplot.js"));

            bundles.Add(new StyleBundle("~/Content/pivot/css").Include(
                "~/Content/pivot.css"));

            bundles.Add(new ScriptBundle("~/bundles/pivot").Include(
                "~/Scripts/pivot.js", 
                "~/Scripts/gchart_renderers.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqplot_plugin").Include(
                "~/Scripts/plugins/jqplot.highlighter.min.js",
                "~/Scripts/plugins/jqplot.cursor.min.js",
                "~/Scripts/plugins/jqplot.dateAxisRenderer.min.js",
                "~/Scripts/plugins/jqplot.pieRenderer.min.js",
                "~/Scripts/plugins/jqplot.donutRenderer.min.js", 
                "~/Scripts/plugins/jqplot.enhancedLegendRenderer.min.js", 
                "~/scripts/plugins/jqplot.categoryAxisRenderer.min.js",
                "~/scripts/plugins/jqplot.pointLabels.min.js",
                "~/scripts/plugins/jqplot.canvasAxisTickRenderer.min.js",
                "~/scripts/plugins/jqplot.canvasAxisLabelRenderer.min.js",
                "~/scripts/plugins/jqplot.canvasAxisTextRenderer.min.js",
                "~/scripts/plugins/jqplot.barRenderer.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqplot_home_charts").Include(
                "~/Scripts/charts/homeCharts.js"));

            bundles.Add(new ScriptBundle("~/bundles/json_stat").Include(
                 "~/Scripts/json-stat.js"));

            bundles.Add(new ScriptBundle("~/bundles/gviz_api").Include(
                "~/Scripts/gviz-api.js"));
        }
    }
}
