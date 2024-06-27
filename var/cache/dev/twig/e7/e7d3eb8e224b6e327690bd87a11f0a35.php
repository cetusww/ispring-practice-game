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
class __TwigTemplate_c61ee6c978134a7ede31233ddff2711e extends Template
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
  <link rel=\"stylesheet\" href=\"css/screensaver-style.css\">
</head>
<body>
  <div class=\"title\">
    <h1 class=\"title-text\">Game name</h1>
  </div>
  <form action=\"/user/signup\">
    <button type=\"submit\">Sign Up</button>
  </form>
  <form action=\"/user/signin\">
    <button type=\"submit\">Sign In</button>
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
  <link rel=\"stylesheet\" href=\"css/screensaver-style.css\">
</head>
<body>
  <div class=\"title\">
    <h1 class=\"title-text\">Game name</h1>
  </div>
  <form action=\"/user/signup\">
    <button type=\"submit\">Sign Up</button>
  </form>
  <form action=\"/user/signin\">
    <button type=\"submit\">Sign In</button>
  </form>
</body>
</html>", "screensaver.html.twig", "/home/ersulov/PhpstormProjects/ispring-practice-game/templates/screensaver.html.twig");
    }
}