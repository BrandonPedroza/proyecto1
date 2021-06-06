

/* lexical grammar */
%lex

//%x string
%%
//"\""               this.begin("string");
//<string>"\""       this.popState();

[.\n]+      /* skip over text not in quotes */

\s+                   /* skip whitespace */
"+"                         return '+';
"-"                         return '-';
"*"                         return '*';
"//"                         return 'barras';
"/"                         return '/';
"mod"                         return 'mod';
"div"                         return 'div';
"<="                        return '<=';
">="                        return '>=';
"<"                         return '<';
">"                         return '>';
"="                         return '=';
"=="                        return 'equal';
"!="                        return '!=';

"and"                        return 'and';
"or"                        return 'or';
"!"                         return 'not';
".."                         return '..';
"."                         return '.';
":"                         return ':';
";"                         return 'semicolon';
"("                         return 'lparen';
")"                         return 'rparen';
"["                         return '[';
"]"                         return ']';
"@"                         return 'arroba';
"&&"                        return 'and';
"|"                        return '|';

"ancestor"                          return 'ancestor';
"ancestor-or-self"                  return 'ancestor-or-self';
"attribute"                         return 'attribute';
"child"                             return 'child';
"descendant"                        return 'descendant';
"descendant-or-self"                return 'descendant-or-self';
"following"                         return 'following';
"following-sibling"                 return 'following-sibling';
"namespace"                         return 'namespace';
"parent"                            return 'parent';
"preceding"                         return 'preceding';
"preceding-sibling"                 return 'preceding-sibling';
"self"                              return 'self';

(([0-9]+"."[0-9]*)|("."[0-9]+))     return 'DoubleLiteral';
[0-9]+                              return 'IntegerLiteral';
\"[^\"]*\"                           return 'string'
[a-zA-Z_][a-zA-Z0-9_ñÑ]*            return 'nodename';

{stringliteral}                     return 'StringLiteral';
{charliteral}                       return 'CharLiteral';
"last()"                            return 'last';
"position()"                        return 'position';
"node()"                            return 'node';
"text()"                            return 'text';

<<EOF>>                 return 'EOF'
.                       {
                                console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
                        }

/lex

//SECCION DE IMPORTS
%{
        const {sentenciaXpath} = require("../Estructuras/sentenciaXpath.js");
        const {parametroXpath} = require("../Estructuras/parametroXpath.js");
        const {TipoParametro, TipoOperador} = require("../Estructuras/tipificacion.js");
     
%}

// DEFINIMOS PRESEDENCIA DE OPERADORES
%left 'or'
%left 'and'
%left '<' '>' '>=' '<=' '=' '!='
%left '+' '-'
%left 'div' '*' 'mod'

%left UMINUS

%left 'lparen' 'rparen'


%start expressions

%% /* language grammar */

expressions
    : XPath EOF
        { typeof console !== 'undefined' ? console.log($1) : print($1);
          return $1; }
    ;

XPath : LSENTENCIA;

LSENTENCIA: LSENTENCIA operador_logico SENTENCIA
        | SENTENCIA;


SENTENCIA : SENTENCIA NODO_PREDICABLE predicate 
        | SENTENCIA NODO_NO_PREDICABLE 
        | NODO;


NODO : '//'
        | '/'
        | nodename predicate
        | '*'
        | '..'
        | '.'
        |AXIS
        ;

NODO_PREDICABLE: nodename
        | AXIS PARAMETRO_AXIS
        | ATRIBUTO
        | '..'
        | '.'
        | '*';
PARAMETRO_AXIS : nodename
        | FUNCION_NO_OPERABLE
        | '*';

NODO_NO_PREDICABLE: FUNCION_NO_OPERABLE
        | barras
        | '/';

FUNCION_NO_OPERABLE : node
                | text;


predicate : '[' PARAMETRO ']' {$$ = $2;}
        | {$$ = new parametroXpath("","",TipoParametro.Empty);}
        ;



ATRIBUTO : arroba nodename
        |  arroba '*';

FUNCION_OPERABLE : last {$$ = $1;}
        | position {$$ = $1;};

//1,last(),last()-1||@x="y",@x=y,4+4

PARAMETRO : OPERACION
        | numberLiteral
        | FUNCION_OPERABLE
        | '..'
        | '.'
        | ATRIBUTO
        | string
        | nodename
;

OPERACION: PARAMETRO '+' PARAMETRO
        |PARAMETRO '-' PARAMETRO
        |PARAMETRO '*' PARAMETRO
        |PARAMETRO 'mod' PARAMETRO
        |PARAMETRO 'div' PARAMETRO
        |PARAMETRO '<=' PARAMETRO
        |PARAMETRO '>=' PARAMETRO
        |PARAMETRO '<' PARAMETRO
        |PARAMETRO '=' PARAMETRO
        |PARAMETRO '!=' PARAMETRO
        |PARAMETRO 'and' PARAMETRO
        |PARAMETRO 'or' PARAMETRO
        ;


    
numberLiteral : DoubleLiteral {$$ = Number($1);}
        | IntegerLiteral {$$ = Number($1);};


AXIS: NOMBRE_AXIS  ':'':' ;


NOMBRE_AXIS : 'ancestor'
        |'ancestor-or-self' 
        |'attribute' 
        |'child' 
        |'descendant' 
        |'descendant-or-self'
        |'following' 
        |'following-sibling' 
        |'namespace'  
        |'parent' 
        |'preceding' 
        |'preceding-sibling'
        |'self' ;
