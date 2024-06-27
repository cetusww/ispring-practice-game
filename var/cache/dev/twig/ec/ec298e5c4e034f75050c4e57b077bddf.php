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
class __TwigTemplate_fd4843de711f1003abfd9aab75c59dc7 extends Template
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
    <link href=\"https://cdn.jsdelivr.net/npm/beercss@3.5.8/dist/cdn/beer.min.css\" rel=\"stylesheet\">
</head>
<body>
<div class=\"form\">
    <form action=\"/signin\" method=\"post\">
        <div class=\"form__username\">
            <input name=\"username\" id=\"username\" type=\"text\" placeholder=\"имя\">
        </div>
        <div class=\"form__password\">
            <input name=\"password\" id=\"password\" type=\"password\" placeholder=\"пароль\">
        </div>
        <button class=\"button-large\" type=\"submit\">войти</button>
    </form>
    <p>Ещё не зарегистрированы?</p>
    <form action=\"/user/signup\">
        <button class=\"secondary-button\" type=\"submit\">регистрация</button>
    </form>
</div>
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
    <link href=\"https://cdn.jsdelivr.net/npm/beercss@3.5.8/dist/cdn/beer.min.css\" rel=\"stylesheet\">
</head>
<body>
<div class=\"form\">
    <form action=\"/signin\" method=\"post\">
        <div class=\"form__username\">
            <input name=\"username\" id=\"username\" type=\"text\" placeholder=\"имя\">
        </div>
        <div class=\"form__password\">
            <input name=\"password\" id=\"password\" type=\"password\" placeholder=\"пароль\">
        </div>
        <button class=\"button-large\" type=\"submit\">войти</button>
    </form>
    <p>Ещё не зарегистрированы?</p>
    <form action=\"/user/signup\">
        <button class=\"secondary-button\" type=\"submit\">регистрация</button>
    </form>
</div>
</body>
</html>", "signin-user-form.html.twig", "/home/yogurt/Documents/projects/ispring-practice-game/templates/signin-user-form.html.twig");
    }
}
