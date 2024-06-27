<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\CoreExtension;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* screensaver.html.twig */
class __TwigTemplate_036a01fc20abbd042f5b6865d8d022f7 extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "screensaver.html.twig"));

        yield "<!DOCTYPE html>
<html lang=\"en\">
<head>
  <meta charset=\"UTF-8\">
  <title>Title</title>
  <link href=\"https://fonts.googleapis.com/css2?family=Miltonian+Tattoo&display=swap\" rel=\"stylesheet\">
  <link rel=\"stylesheet\" href=\"css/screensaver-style.css\">
  <link href=\"https://cdn.jsdelivr.net/npm/beercss@3.5.8/dist/cdn/beer.min.css\" rel=\"stylesheet\">
</head>
<body>
  <h1 class=\"center-align title\">Demon Deliverance</h1>
  <form action=\"/user/signin\">
    <button class=\"medium padding center button-custom\" type=\"submit\">Continue</button>
  </form>
</body>
</html>";
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "screensaver.html.twig";
    }

    /**
     * @codeCoverageIgnore
     */
    public function getDebugInfo()
    {
        return array ();
    }

    public function getSourceContext()
    {
        return new Source("<!DOCTYPE html>
<html lang=\"en\">
<head>
  <meta charset=\"UTF-8\">
  <title>Title</title>
  <link href=\"https://fonts.googleapis.com/css2?family=Miltonian+Tattoo&display=swap\" rel=\"stylesheet\">
  <link rel=\"stylesheet\" href=\"css/screensaver-style.css\">
  <link href=\"https://cdn.jsdelivr.net/npm/beercss@3.5.8/dist/cdn/beer.min.css\" rel=\"stylesheet\">
</head>
<body>
  <h1 class=\"center-align title\">Demon Deliverance</h1>
  <form action=\"/user/signin\">
    <button class=\"medium padding center button-custom\" type=\"submit\">Continue</button>
  </form>
</body>
</html>", "screensaver.html.twig", "/home/yogurt/Documents/projects/ispring-practice-game/templates/screensaver.html.twig");
    }
}
