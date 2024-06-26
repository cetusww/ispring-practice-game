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

/* signin-user-form.html.twig */
class __TwigTemplate_e9a2296909eb27c800ec6298545f18b5 extends Template
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
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "signin-user-form.html.twig"));

        yield "<!DOCTYPE html>
<html lang=\"en\">
<head>
    <meta charset=\"UTF-8\">
    <title>Sign In User</title>
    <link rel=\"stylesheet\" href=\"css/signin-style.css\">
</head>
<body>
<div class=\"form\">
    <h1 class=\"form__title\">Sign In</h1>
    <form action=\"/signin\" method=\"post\">
        <div class=\"form__username\">
            <label for=\"username\">Name:</label><br>
            <input name=\"username\" id=\"username\" type=\"text\">
        </div>
        <div class=\"form__password\">
            <label for=\"password\">Password:</label><br>
            <input name=\"password\" id=\"password\" type=\"text\">
        </div>
        <button class=\"form__button-signin\" type=\"submit\">Sign In</button>
    </form>
</div>
</body>";
        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "signin-user-form.html.twig";
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
    <title>Sign In User</title>
    <link rel=\"stylesheet\" href=\"css/signin-style.css\">
</head>
<body>
<div class=\"form\">
    <h1 class=\"form__title\">Sign In</h1>
    <form action=\"/signin\" method=\"post\">
        <div class=\"form__username\">
            <label for=\"username\">Name:</label><br>
            <input name=\"username\" id=\"username\" type=\"text\">
        </div>
        <div class=\"form__password\">
            <label for=\"password\">Password:</label><br>
            <input name=\"password\" id=\"password\" type=\"text\">
        </div>
        <button class=\"form__button-signin\" type=\"submit\">Sign In</button>
    </form>
</div>
</body>", "signin-user-form.html.twig", "/home/yogurt/Documents/projects/ispring-practice-game/templates/signin-user-form.html.twig");
    }
}
