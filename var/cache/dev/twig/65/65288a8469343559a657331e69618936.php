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
class __TwigTemplate_495623f95256f54b0dad50c3ab576526 extends Template
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
    <link rel=\"stylesheet\" href=\"css/signup-style.css\">
</head>
<body>
<div class=\"form\">
    <h1 class=\"form__title\">Sign Up</h1>
    ";
        // line 11
        $context['_parent'] = $context;
        $context['_seq'] = CoreExtension::ensureTraversable(CoreExtension::getAttribute($this->env, $this->source, (isset($context["app"]) || array_key_exists("app", $context) ? $context["app"] : (function () { throw new RuntimeError('Variable "app" does not exist.', 11, $this->source); })()), "flashes", ["error"], "method", false, false, false, 11));
        foreach ($context['_seq'] as $context["_key"] => $context["message"]) {
            // line 12
            yield "        <div class=\"alert alert-danger\">
            ";
            // line 13
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($context["message"], "html", null, true);
            yield "
        </div>
    ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['message'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 16
        yield "    <form action=\"/signup\" method=\"post\">
        <div class=\"form__username\">
            <input name=\"username\" id=\"username\" type=\"text\" placeholder=\"имя\">
        </div>
        <div class=\"form__password\">
            <input name=\"password\" id=\"password\" type=\"text\" placeholder=\"пароль\">
        </div>
        <button class=\"form__button-signup\" type=\"submit\">войти</button>
    </form>
    <form action=\"/user/signin\">
        <button type=\"submit\">Sign In</button>
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
        return array (  69 => 16,  60 => 13,  57 => 12,  53 => 11,  41 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("<!DOCTYPE html>
<html lang=\"en\">
<head>
    <meta charset=\"UTF-8\">
    <title>Sign Up User</title>
    <link rel=\"stylesheet\" href=\"css/signup-style.css\">
</head>
<body>
<div class=\"form\">
    <h1 class=\"form__title\">Sign Up</h1>
    {% for message in app.flashes('error') %}
        <div class=\"alert alert-danger\">
            {{ message }}
        </div>
    {% endfor %}
    <form action=\"/signup\" method=\"post\">
        <div class=\"form__username\">
            <input name=\"username\" id=\"username\" type=\"text\" placeholder=\"имя\">
        </div>
        <div class=\"form__password\">
            <input name=\"password\" id=\"password\" type=\"text\" placeholder=\"пароль\">
        </div>
        <button class=\"form__button-signup\" type=\"submit\">войти</button>
    </form>
    <form action=\"/user/signin\">
        <button type=\"submit\">Sign In</button>
    </form>
</div>
</body>", "signup-user-form.html.twig", "/home/yogurt/Documents/projects/ispring-practice-game/templates/signup-user-form.html.twig");
    }
}
