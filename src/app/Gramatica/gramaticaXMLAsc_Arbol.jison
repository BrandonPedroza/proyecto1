/* Definición Léxica */
%lex

%options case-insensitive

escapechar                          [\'\"\\bfnrtv]
escape                              \\{escapechar}
acceptedcharsdouble                 [^\"\\]+
stringdouble                        {escape}|{acceptedcharsdouble}
stringliteral                       \"{stringdouble}*\"

acceptedcharssingle                 [^\'\\]
stringsingle                        {escape}|{acceptedcharssingle}
charliteral                         \'{stringsingle}\'

charLiteralMulti                    \'{stringsingle}*\'


BSL                                 "\\".
%s                                  comment
%%

"//".*                              /* skip comments */
"<!--"                               this.begin('comment');
<comment>"-->"                       this.popState();
<comment>.                          /* skip comment content*/
\s+                                 /* skip whitespace */


"print"                     return 'print';
"null"                      return 'null';
"true"                      return 'true';
"false"                     return 'false';

"+"                         return 'plus';
"-"                         return 'minus';
"*"                         return 'times';
"/"                         return 'div';
"%"                         return 'mod';

"<="                        return 'lte';
">="                        return 'gte';
"<"                         return 'lt';
">"                         return 'gt';
"="                         return 'asig';
"=="                        return 'equal';
"!="                        return 'nequal';

"&&"                        return 'and';
"||"                        return 'or';
"!"                         return 'not';

";"                         return 'semicolon';
"("                         return 'lparen';
")"                         return 'rparen';

"&&"                        return 'and';
"||"                        return 'or';
"!"                         return 'not';
"xml"                       return 'rxml';
"version"                   return 'rversion';
"encoding"                  return 'rencoding';
"?"                         return 'interrogacion';

/* Number literals */
(([0-9]+"."[0-9]*)|("."[0-9]+))     return 'DoubleLiteral';
[0-9]+                              return 'IntegerLiteral';

[a-zA-Z_][a-zA-Z0-9_ñÑ]*            return 'identifier';

{stringliteral}                     return 'StringLiteral';
{charliteral}                       return 'CharLiteral';
{charLiteralMulti}                  return 'charLiteralMulti';
//error lexico
.                                   {
                                        console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
                                    }

<<EOF>>                     return 'EOF'

/lex

//SECCION DE IMPORTS
%{
    const {Print} = require("../Instrucciones/Primitivas/Print");
    const {Primitivo} = require("../Expresiones/Primitivo");
    const {Operacion, Operador} = require("../Expresiones/Operacion");
    const {Objeto} = require("../Expresiones/Objeto");
    const {Atributo} = require("../Expresiones/Atributo");
    const {NodoArbol} = require("../AST/NodoArbol");

%}

// DEFINIMOS PRESEDENCIA DE OPERADORES
%left 'or'
%left 'and'
%left 'lt' 'lte' 'gt' 'gte' 'equal' 'nequal'
%left 'plus' 'minus'
%left 'times' 'div' 'mod'
%left 'pow'
%left 'not'
%left UMINUS

%left 'lparen' 'rparen'


// DEFINIMOS PRODUCCIÓN INICIAL
%start START

%%


/* Definición de la gramática */
START : RAICES EOF
        {
            var root = new NodoArbol("START","");
                    root.agregarHijo($1[1]);
                    console.log("TODO BIEN, TODO CORRECTO :D!! (Version 2)");
                    $$ = [$1[0], root];
                    return $$;
        };/*
INICIO RAICES EOF         { $$ = $2; return $$; }
        | RAICES EOF         { $$ = $1; return $$; }
    ;

INICIO : lt interrogacion rxml rversion asig StringLiteral rencoding asig StringLiteral interrogacion gt {console.log('version' + $6);}
        
;*/

RAICES:
        RAICES OBJETO
        {
            nodoAux = new NodoArbol("RAICES","");                                  
                                            nodoAux.agregarHijo($2[1]);
                                            $1[1].agregarHijo(nodoAux);
                                            $1[0].push($2[0]); 
                                            $$ = [$1[0],$1[1]]; 
        }
        |OBJETO
        {
            nodoAux = new NodoArbol("ListaObjetosRaiz","");
                                        nodoAux.agregarHijo($1[1]);
                                        $$ = [[$1[0]],nodoAux];
        };

/*
    RAICES RAIZ           { $1.push($2); $$ = $1;}
    | RAIZ                { $$ = [$1]; } ;

RAIZ:
 OBJETO              { $$ = $1 }
;*/

OBJETO:
    lt interrogacion rxml rversion asig StringLiteral rencoding asig StringLiteral interrogacion gt 
    {
        nodoAux = new NodoArbol("UN_OBJETO","");
                nodoAux.agregarHijo(new NodoArbol($1,"simbolo"));
                nodoAux.agregarHijo(new NodoArbol($2,"simbolo"));
                nodoAux.agregarHijo(new NodoArbol($3,"palabra reservada"));
                nodoAux.agregarHijo(new NodoArbol($4,"palabra reservada"));
                nodoAux.agregarHijo(new NodoArbol($5,"simbolo"));
                nodoAux.agregarHijo(new NodoArbol($6,"cadena"));
                nodoAux.agregarHijo(new NodoArbol($7,"palabra reservada"));
                nodoAux.agregarHijo(new NodoArbol($8,"simbolo"));
                nodoAux.agregarHijo(new NodoArbol($9,"cadena"));
                nodoAux.agregarHijo(new NodoArbol($10,"simbolo"));
                nodoAux.agregarHijo(new NodoArbol($11,"simbolo"));
                objeto = new Objeto("version","version",$9[0],@1.first_line, @1.first_column,[],[]);
                $$ = [objeto,nodoAux];
        
    } 
    |  lt identifier LATRIBUTOS gt OBJETOS           lt div identifier gt       
    { 
        nodoAux = new NodoArbol("UN_OBJETO","");
                nodoAux.agregarHijo(new NodoArbol($1,"simbolo"));
                nodoAux.agregarHijo(new NodoArbol($2,"identificador"));
                nodoAux.agregarHijo($3[1]);
                nodoAux.agregarHijo(new NodoArbol($4,"simbolo"));
                nodoAux.agregarHijo($5[1]);
                nodoAux.agregarHijo(new NodoArbol($6,"simbolo"));
                nodoAux.agregarHijo(new NodoArbol($7,"simbolo"));
                nodoAux.agregarHijo(new NodoArbol($8,"identificador"));
                nodoAux.agregarHijo(new NodoArbol($9,"simbolo"));
                objeto = new Objeto($2,$8,'',@1.first_line, @1.first_column,$3[0],$5[0]);
                $$ = [objeto,nodoAux];
       // $$ = new Objeto($2,'',@1.first_line, @1.first_column,$3,$5); 
    }
    | lt identifier LATRIBUTOS gt LISTA_ID_OBJETO   lt div identifier gt       
    { //$$ = new Objeto($2,$5,@1.first_line, @1.first_column,$3,[]); 
        nodoAux = new NodoArbol("UN_OBJETO","");
                nodoAux.agregarHijo(new NodoArbol($1,"simbolo"));
                nodoAux.agregarHijo(new NodoArbol($2,"identificador"));
                nodoAux.agregarHijo($3[1]);
                nodoAux.agregarHijo(new NodoArbol($4,"simbolo"));
                nodoAux.agregarHijo($5[1]);
                nodoAux.agregarHijo(new NodoArbol($6,"simbolo"));
                nodoAux.agregarHijo(new NodoArbol($7,"simbolo"));
                nodoAux.agregarHijo(new NodoArbol($8,"identificador"));
                nodoAux.agregarHijo(new NodoArbol($9,"simbolo"));
                objeto = new Objeto($2,$8,$5[0],@1.first_line, @1.first_column,$3[0],[]);
                $$ = [objeto,nodoAux];
    }
    | lt identifier LATRIBUTOS div gt                                          
    { //$$ = new Objeto($2,'',@1.first_line, @1.first_column,$3,[]); 
        nodoAux = new NodoArbol("ObjetoRaiz","");
                nodoAux.agregarHijo(new NodoArbol($1,"simbolo"));
                nodoAux.agregarHijo(new NodoArbol($2,"identificador"));
                nodoAux.agregarHijo($3[1]);
                nodoAux.agregarHijo(new NodoArbol($4,"simbolo"));
                nodoAux.agregarHijo(new NodoArbol($5,"simbolo"));
                objeto = new Objeto($2,$2,'',@1.first_line, @1.first_column,$3[0],[]);
                $$ = [objeto,nodoAux];
    }
;


LATRIBUTOS: ATRIBUTOS                                   
    { 
    //$$ = $1; 
    nodoAux = new NodoArbol("ListaAtributos","");
                          nodoAux.agregarHijo($1[1]);
                          $$ = [$1[0], nodoAux]; 
    }
    |                                        
    { 
        //$$ = []; 
    nodoAux = new NodoArbol("ListaAtributos","");
                    nodoAux.agregarHijo(new NodoArbol("E","simbolo"));
                    $$ = [[], nodoAux]; 
    }
;

ATRIBUTOS:
    ATRIBUTOS ATRIBUTO                              
    {
        nodoAux = new NodoArbol("Atributos","");                                  
                                  nodoAux.agregarHijo($2[1]);
                                  $1[1].agregarHijo(nodoAux);
                                  $1[0].push($2[0]); 
                                  $$ = [$1[0],$1[1]];
        // $1.push($2); $$ = $1;
    }
    | ATRIBUTO                                      
    {
        //$$ = [$1]; 
        nodoAux = new NodoArbol("Atributos","");
                                  nodoAux.agregarHijo($1[1]);
                                  $$ = [[$1[0]],nodoAux];
    } 
;

ATRIBUTO: 
    identifier asig STR_CHR                   
    { 
        //$$ = new Atributo($1, $3, @1.first_line, @1.first_column); 
        nodoAux = new NodoArbol("Atributo","");
        nodoAux.agregarHijo(new NodoArbol($1,"identificador"));
        nodoAux.agregarHijo(new NodoArbol($2,"simbolo"));
        nodoAux.agregarHijo($3[1]);
        atributo = new Atributo($1, $3, @1.first_line, @1.first_column);
        $$ = [atributo,nodoAux]; 
    }
;

STR_CHR:   StringLiteral               
        { 
            //$$ = $1 
            nodoAux = new NodoArbol($1,"cadena");
                        $$ = [$1, nodoAux]; 
        }
        |  charLiteralMulti            
        { 
            nodoAux = new NodoArbol($1,"cadenaChar");
                        $$ = [$1, nodoAux]; 
            //$$ = $1 
        };




LISTA_ID_OBJETO: LISTA_ID_OBJETO ID          
                { 
                    nodoAux = new NodoArbol("LISTA_ID_TEXTO","");
                        nodoAux.agregarHijo($2[1]);
                        $1[1].agregarHijo(nodoAux);
                        $1[0] = $1[0] + " " + $2[0];
                        $$ = [$1[0],$1[1]]; 
                    //$1=$1 + ' ' +$2 ; $$ = $1;
                }
                | ID                                 
                { 
                    nodoAux = new NodoArbol("ID_TEXTO","");
                   nodoAux.agregarHijo($1[1]);
                   $$ = [$1[0],nodoAux];
                    //$$ = $1 
                }
;

ID:          identifier      
            {  
                nodoAux = new NodoArbol("IDENTIFICADOR","");
                nodoAux.agregarHijo(new NodoArbol($1,"texto"));
                $$ = [$1,nodoAux];
                //$$ = $1 
            }
            | DoubleLiteral   
            { 
                nodoAux = new NodoArbol("DOUBLE","");
                nodoAux.agregarHijo(new NodoArbol($1,"texto"));
                $$ = [$1,nodoAux];
                //$$ = $1 
            }
            | IntegerLiteral  
            { 
                nodoAux = new NodoArbol("INTEGER","");
                nodoAux.agregarHijo(new NodoArbol($1,"texto"));
                $$ = [$1,nodoAux];
                //$$ = $1 
            }
;

OBJETOS:
    OBJETOS OBJETO        
    {
        nodoAux = new NodoArbol("OBJETOS","");                                  
        nodoAux.agregarHijo($2[1]);
        $1[1].agregarHijo(nodoAux);
        $1[0].push($2[0]); 
        $$ = [$1[0],$1[1]];
        //$1.push($2); $$ = $1;
    }
	| OBJETO                
    {
        nodoAux = new NodoArbol("OBJETO","");
        nodoAux.agregarHijo($1[1]);
        $$ = [[$1[0]],nodoAux];  
        // $$ = [$1]; 
    } ;

