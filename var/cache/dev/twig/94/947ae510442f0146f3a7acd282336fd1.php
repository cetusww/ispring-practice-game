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

/* menu.html.twig */
class __TwigTemplate_d72ef5f29770d0abb6ccd652b3072594 extends Template
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
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "menu.html.twig"));

        yield "<!DOCTYPE html>
<html lang=\"en\">
<head>
  <meta charset=\"UTF-8\">
  <title>Game name</title>
  <link rel=\"stylesheet\" href=\"css/menu-style.css\">
</head>
<body>
  <h1>Game name</h1>
  <p>Legend</p>
  <form action=\"/game\">
    <button type=\"submit\">Play</button>
  </form>
  <form action=\"/user/signout\">
    <button type=\"submit\">Sign Out</button>
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
        return "menu.html.twig";
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
  <title>Game name</title>
  <link rel=\"stylesheet\" href=\"css/menu-style.css\">
</head>
<body>
  <h1>Game name</h1>
  <p>Legend</p>
  <form action=\"/game\">
    <button type=\"submit\">Play</button>
  </form>
  <form action=\"/user/signout\">
    <button type=\"submit\">Sign Out</button>
  </form>
</body>
</html>", "menu.html.twig", "/home/yogurt/Documents/projects/ispring-practice-game/templates/menu.html.twig");
    }
}
