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

/* signup-user-form.html.twig */
class __TwigTemplate_9d6f775bae3b630dfada8e50e1fd40e1 extends Template
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
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "signup-user-form.html.twig"));

        // line 1
        yield "<!DOCTYPE html>
<html lang=\"en\">
<head>
    <meta charset=\"UTF-8\">
    <title>Sign Up User</title>
    <link rel=\"stylesheet\" href=\"/css/signup-style.css\">
    <link href=\"https://cdn.jsdelivr.net/npm/beercss@3.5.8/dist/cdn/beer.min.css\" rel=\"stylesheet\">
    <script src=\"/script/validation.js\" type=\"application/javascript\"></script>
</head>
<body>
<div id=\"form\" class=\" form\">
    <form action=\"/signup\" method=\"post\">
        <span class=\"error-text\">";
        // line 13
        (((CoreExtension::getAttribute($this->env, $this->source, ($context["errors"] ?? null), "username", [], "any", true, true, false, 13) &&  !(null === CoreExtension::getAttribute($this->env, $this->source, ($context["errors"] ?? null), "username", [], "any", false, false, false, 13)))) ? (yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, ($context["errors"] ?? null), "username", [], "any", false, false, false, 13), "html", null, true)) : (yield ""));
        yield "</span>
        <div class=\"field border fill responsive input\">
            <input name=\"username\" id=\"username\" type=\"text\" placeholder=\"имя\">
        </div>
        <span class=\"error-text\">";
        // line 17
        (((CoreExtension::getAttribute($this->env, $this->source, ($context["errors"] ?? null), "password", [], "any", true, true, false, 17) &&  !(null === CoreExtension::getAttribute($this->env, $this->source, ($context["errors"] ?? null), "password", [], "any", false, false, false, 17)))) ? (yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, ($context["errors"] ?? null), "password", [], "any", false, false, false, 17), "html", null, true)) : (yield ""));
        yield "</span>
        <div class=\"field border fill input\">
            <input name=\"password\" id=\"password\" type=\"password\" placeholder=\"пароль\">
        </div>
        <button class=\"small-round responsive button-signin\" type=\"submit\">зарегистрироваться</button>
    </form>
    <p class=\"center-align form__text\">Уже зарегистрированы?</p>
    <form action=\"/user/signin\">
        <button class=\"small-round responsive button-signup\" type=\"submit\">войти</button>
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
        return "signup-user-form.html.twig";
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
        return array (  62 => 17,  55 => 13,  41 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("<!DOCTYPE html>
<html lang=\"en\">
<head>
    <meta charset=\"UTF-8\">
    <title>Sign Up User</title>
    <link rel=\"stylesheet\" href=\"/css/signup-style.css\">
    <link href=\"https://cdn.jsdelivr.net/npm/beercss@3.5.8/dist/cdn/beer.min.css\" rel=\"stylesheet\">
    <script src=\"/script/validation.js\" type=\"application/javascript\"></script>
</head>
<body>
<div id=\"form\" class=\" form\">
    <form action=\"/signup\" method=\"post\">
        <span class=\"error-text\">{{ errors.username ?? '' }}</span>
        <div class=\"field border fill responsive input\">
            <input name=\"username\" id=\"username\" type=\"text\" placeholder=\"имя\">
        </div>
        <span class=\"error-text\">{{ errors.password ?? '' }}</span>
        <div class=\"field border fill input\">
            <input name=\"password\" id=\"password\" type=\"password\" placeholder=\"пароль\">
        </div>
        <button class=\"small-round responsive button-signin\" type=\"submit\">зарегистрироваться</button>
    </form>
    <p class=\"center-align form__text\">Уже зарегистрированы?</p>
    <form action=\"/user/signin\">
        <button class=\"small-round responsive button-signup\" type=\"submit\">войти</button>
    </form>
</div>
</body>
</html>", "signup-user-form.html.twig", "/home/yogurt/Documents/projects/ispring-practice-game/templates/signup-user-form.html.twig");
    }
}
