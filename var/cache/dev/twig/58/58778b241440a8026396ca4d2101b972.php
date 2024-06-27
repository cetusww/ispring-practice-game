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

/* game.html.twig */
class __TwigTemplate_1e35d169755188dc3ed6ffd21af8b3de extends Template
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
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "game.html.twig"));

        yield "<!DOCTYPE html>
<html>
<head>
  <!-- <link rel=\"stylesheet\" href=\"style.css\"/> -->
  <title>Game</title>
  <script src=\"script/pixi.js\"></script>
  <script src=\"script/Bullet.js\"></script>
  <script src=\"script/Hero.js\"></script>
  <script src=\"script/Ground.js\"></script>
  <style>
    * {
      margin: 0;
      padding: 0;
    }
  </style>
</head>
<body>
<script src=\"script/index.js\"></script>
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
        return "game.html.twig";
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
<html>
<head>
  <!-- <link rel=\"stylesheet\" href=\"style.css\"/> -->
  <title>Game</title>
  <script src=\"script/pixi.js\"></script>
  <script src=\"script/Bullet.js\"></script>
  <script src=\"script/Hero.js\"></script>
  <script src=\"script/Ground.js\"></script>
  <style>
    * {
      margin: 0;
      padding: 0;
    }
  </style>
</head>
<body>
<script src=\"script/index.js\"></script>
</body>
</html>", "game.html.twig", "/home/ersulov/PhpstormProjects/ispring-practice-game/templates/game.html.twig");
    }
}
