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

        // line 1
        yield "<!DOCTYPE html>
<html lang=\"en\">
<head>
    <meta charset=\"UTF-8\">
    <title>Sign In User</title>
    <link rel=\"stylesheet\" href=\"/css/signin-style.css\">
    <link href=\"https://cdn.jsdelivr.net/npm/beercss@3.5.8/dist/cdn/beer.min.css\" rel=\"stylesheet\">
</head>
<body>
<div class=\" form\">
    <form action=\"/signin\" method=\"post\">
        <span class=\"error-text\">";
        // line 12
        (((CoreExtension::getAttribute($this->env, $this->source, ($context["errors"] ?? null), "username", [], "any", true, true, false, 12) &&  !(null === CoreExtension::getAttribute($this->env, $this->source, ($context["errors"] ?? null), "username", [], "any", false, false, false, 12)))) ? (yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, ($context["errors"] ?? null), "username", [], "any", false, false, false, 12), "html", null, true)) : (yield ""));
        yield "</span>
        <div class=\"field border fill responsive input\">
            <input name=\"username\" id=\"username\" type=\"text\" placeholder=\"имя\">
        </div>
        <span class=\"error-text\">";
        // line 16
        (((CoreExtension::getAttribute($this->env, $this->source, ($context["errors"] ?? null), "password", [], "any", true, true, false, 16) &&  !(null === CoreExtension::getAttribute($this->env, $this->source, ($context["errors"] ?? null), "password", [], "any", false, false, false, 16)))) ? (yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, ($context["errors"] ?? null), "password", [], "any", false, false, false, 16), "html", null, true)) : (yield ""));
        yield "</span>
        <div class=\"field border fill input\">
            <input name=\"password\" id=\"password\" type=\"password\" placeholder=\"пароль\">
        </div>
        <button class=\"small-round responsive button-signin\" type=\"submit\">войти</button>
    </form>
    <p class=\"center-align form__text\">Ещё не зарегистрированы?</p>
    <form action=\"/user/signup\">
        <button class=\"small-round responsive button-signup\" type=\"submit\">регистрация</button>
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
    public function isTraitable()
    {
        return false;
    }

    /**
     * @codeCoverageIgnore
     */
    public function getDebugInfo()
    {
        return array (  61 => 16,  54 => 12,  41 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("<!DOCTYPE html>
<html lang=\"en\">
<head>
    <meta charset=\"UTF-8\">
    <title>Sign In User</title>
    <link rel=\"stylesheet\" href=\"/css/signin-style.css\">
    <link href=\"https://cdn.jsdelivr.net/npm/beercss@3.5.8/dist/cdn/beer.min.css\" rel=\"stylesheet\">
</head>
<body>
<div class=\" form\">
    <form action=\"/signin\" method=\"post\">
        <span class=\"error-text\">{{ errors.username ?? '' }}</span>
        <div class=\"field border fill responsive input\">
            <input name=\"username\" id=\"username\" type=\"text\" placeholder=\"имя\">
        </div>
        <span class=\"error-text\">{{ errors.password ?? '' }}</span>
        <div class=\"field border fill input\">
            <input name=\"password\" id=\"password\" type=\"password\" placeholder=\"пароль\">
        </div>
        <button class=\"small-round responsive button-signin\" type=\"submit\">войти</button>
    </form>
    <p class=\"center-align form__text\">Ещё не зарегистрированы?</p>
    <form action=\"/user/signup\">
        <button class=\"small-round responsive button-signup\" type=\"submit\">регистрация</button>
    </form>
</div>
</body>
</html>", "signin-user-form.html.twig", "/home/yogurt/Documents/projects/ispring-practice-game/templates/signin-user-form.html.twig");
    }
}
