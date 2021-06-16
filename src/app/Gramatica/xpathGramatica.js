/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var xpathGramatica = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,6],$V1=[1,7],$V2=[1,8],$V3=[1,9],$V4=[1,10],$V5=[1,11],$V6=[1,14],$V7=[1,15],$V8=[1,16],$V9=[1,17],$Va=[1,18],$Vb=[1,19],$Vc=[1,20],$Vd=[1,21],$Ve=[1,22],$Vf=[1,23],$Vg=[1,24],$Vh=[1,25],$Vi=[1,26],$Vj=[5,7],$Vk=[1,32],$Vl=[1,33],$Vm=[1,34],$Vn=[1,35],$Vo=[1,38],$Vp=[1,39],$Vq=[1,40],$Vr=[1,41],$Vs=[1,42],$Vt=[5,7,13,14,15,16,17,18,22,25,29,53,54,55,56,57,58,59,60,61,62,63,64,65],$Vu=[2,27],$Vv=[1,44],$Vw=[5,7,13,14,15,16,17,18,22,25,26,29,53,54,55,56,57,58,59,60,61,62,63,64,65],$Vx=[1,60],$Vy=[1,56],$Vz=[1,57],$VA=[1,65],$VB=[1,61],$VC=[1,62],$VD=[1,59],$VE=[1,63],$VF=[1,64],$VG=[5,7,13,14,15,16,17,18,22,24,25,26,28,29,36,37,38,39,40,41,42,43,44,45,46,47,53,54,55,56,57,58,59,60,61,62,63,64,65],$VH=[1,72],$VI=[1,70],$VJ=[1,71],$VK=[1,73],$VL=[1,74],$VM=[1,75],$VN=[1,76],$VO=[1,77],$VP=[1,78],$VQ=[1,79],$VR=[1,80],$VS=[1,81],$VT=[1,82],$VU=[15,24,28,36,37,38,39,40,41,42,43,44,45,46,47],$VV=[24,28,36,37,40,41,42,43,44,45,46,47],$VW=[24,28,40,41,42,43,44,45,46,47];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"expressions":3,"XPath":4,"EOF":5,"LSENTENCIA":6,"|":7,"SENTENCIA":8,"NODO_NO_PREDICABLE":9,"NODO_PREDICABLE":10,"predicate":11,"NODO":12,"BARRAS":13,"BARRASIMPLE":14,"*":15,"nodename":16,"DOBLEDOT":17,"DOT":18,"AXIS":19,"ATRIBUTO":20,"FUNCION_NO_OPERABLE":21,"node":22,"lparen":23,"rparen":24,"text":25,"[":26,"PARAMETRO":27,"]":28,"arroba":29,"FUNCION_OPERABLE":30,"last":31,"position":32,"numberLiteral":33,"OPERACION":34,"STRING_LITERAL":35,"+":36,"-":37,"mod":38,"div":39,"<=":40,">=":41,">":42,"<":43,"=":44,"!=":45,"and":46,"or":47,"DoubleLiteral":48,"entero":49,"NOMBRE_AXIS":50,":":51,"PARAMETRO_AXIS":52,"ancestor":53,"ancestor-or-self":54,"attribute":55,"child":56,"descendant":57,"descendant-or-self":58,"following":59,"following-sibling":60,"namespace":61,"parent":62,"preceding":63,"preceding-sibling":64,"self":65,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",7:"|",13:"BARRAS",14:"BARRASIMPLE",15:"*",16:"nodename",17:"DOBLEDOT",18:"DOT",22:"node",23:"lparen",24:"rparen",25:"text",26:"[",28:"]",29:"arroba",31:"last",32:"position",35:"STRING_LITERAL",36:"+",37:"-",38:"mod",39:"div",40:"<=",41:">=",42:">",43:"<",44:"=",45:"!=",46:"and",47:"or",48:"DoubleLiteral",49:"entero",51:":",53:"ancestor",54:"ancestor-or-self",55:"attribute",56:"child",57:"descendant",58:"descendant-or-self",59:"following",60:"following-sibling",61:"namespace",62:"parent",63:"preceding",64:"preceding-sibling",65:"self"},
productions_: [0,[3,2],[4,1],[6,3],[6,1],[8,2],[8,3],[8,2],[12,1],[12,1],[12,1],[12,1],[12,1],[12,1],[12,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,1],[9,1],[9,1],[9,1],[21,3],[21,3],[11,3],[11,0],[20,2],[20,2],[30,3],[30,3],[27,1],[27,1],[27,1],[27,1],[27,1],[27,1],[27,1],[27,1],[34,3],[34,3],[34,3],[34,3],[34,3],[34,3],[34,3],[34,3],[34,3],[34,3],[34,3],[34,3],[34,3],[34,3],[33,1],[33,1],[19,4],[50,1],[50,1],[50,1],[50,1],[50,1],[50,1],[50,1],[50,1],[50,1],[50,1],[50,1],[50,1],[50,1],[52,1],[52,1],[52,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 salida = []; typeof console !== 'undefined' ? console.log($$[$0-1]) : print($$[$0-1]);
          return $$[$0-1]; 
break;
case 2:
this.$ = salida; salida = []; return this.$;
break;
case 3:
 salida.push($$[$0]);
break;
case 4:
  salida.push($$[$0]);
break;
case 5:
this.$ = new sentenciaXpath($$[$0],null,$$[$0-1]);
break;
case 6:
this.$ = new sentenciaXpath($$[$0-1],$$[$0],$$[$0-2]);
break;
case 7:
      
                                if($$[$0-1] != TipoNodo.ID && $$[$0] != null) {console.log("Error toquen no debe llever predicado");}
                                else{
                                        this.$ = new sentenciaXpath($$[$0-1],$$[$0],null);
                                }
                        
break;
case 8: case 22:
this.$ = new NodoXpath(TipoNodo.Descendiente,$$[$0],null);
break;
case 9: case 23:
this.$ = new NodoXpath(TipoNodo.Raiz,$$[$0],null);
break;
case 10: case 15: case 72:
this.$ = new NodoXpath(TipoNodo.Asterisco,$$[$0],null);
break;
case 11: case 16: case 70:
this.$ = new NodoXpath(TipoNodo.ID,$$[$0],null);
break;
case 12:
this.$ = new NodoXpath(TipoNodo.NodoPadre,$$[$0],null); 
break;
case 13: case 20:
this.$ = new NodoXpath(TipoNodo.AutoReferencia,$$[$0],null);
break;
case 14: case 17: case 21: case 28: case 29: case 32: case 33: case 57: case 58: case 59: case 60: case 61: case 62: case 63: case 64: case 65: case 66: case 67: case 68: case 69: case 71:
this.$ = $$[$0];
break;
case 18:
this.$ = new NodoXpath(TipoNodo.Atributo,$$[$0],null);
break;
case 19:
this.$ = new NodoXpath(TipoNodo.NodoPadre,$$[$0],null);
break;
case 24:
this.$ = new NodoXpath(TipoNodo.Funcion_Node,$$[$0-2],null);
break;
case 25:
this.$ = new NodoXpath(TipoNodo.Funcion_Text,$$[$0-2],null);
break;
case 26:
this.$ = $$[$0-1];
break;
case 27:
this.$ = null;
break;
case 30:
this.$ = new ParametroOperacionXpath(null,$$[$0-2],TipoParametro.Funtion_Last); console.log($$[$0-2]);
break;
case 31:
this.$ = new ParametroOperacionXpath(null,$$[$0-2],TipoParametro.Funtion_Position);
break;
case 34:
this.$ = new ParametroOperacionXpath($$[$0],'',TipoParametro.Operacion);
break;
case 35:
this.$ = new ParametroOperacionXpath(null,$$[$0],TipoParametro.DosPuntos);
break;
case 36:
this.$ = new ParametroOperacionXpath(null,$$[$0],TipoParametro.Punto);
break;
case 37:
this.$ = new ParametroOperacionXpath(null,$$[$0],TipoParametro.Atributo);
break;
case 38:
this.$ = new ParametroOperacionXpath(null,$$[$0],TipoParametro.Cadena);
break;
case 39:
this.$ = new ParametroOperacionXpath(null,$$[$0],TipoParametro.Nodo);
break;
case 40:
this.$ = new OperacionXpath($$[$0-2],$$[$0],TipoOperador.Mas);
break;
case 41:
this.$ = new OperacionXpath($$[$0-2],$$[$0],TipoOperador.Menos);
break;
case 42:
this.$ = new OperacionXpath($$[$0-2],$$[$0],TipoOperador.Por);
break;
case 43:
this.$ = new OperacionXpath($$[$0-2],$$[$0],TipoOperador.Mod);
break;
case 44:
this.$ = new OperacionXpath($$[$0-2],$$[$0],TipoOperador.Div);
break;
case 45:
this.$ = new OperacionXpath($$[$0-2],$$[$0],TipoOperador.MenorIgual);
break;
case 46:
this.$ = new OperacionXpath($$[$0-2],$$[$0],TipoOperador.MayorIgual);
break;
case 47:
this.$ = new OperacionXpath($$[$0-2],$$[$0],TipoOperador.Mayor);
break;
case 48:
this.$ = new OperacionXpath($$[$0-2],$$[$0],TipoOperador.Menor);
break;
case 49:
this.$ = new OperacionXpath($$[$0-2],$$[$0],TipoOperador.Igual);
break;
case 50:
this.$ = new OperacionXpath($$[$0-2],$$[$0],TipoOperador.Diferente);
break;
case 51:
this.$ = new OperacionXpath($$[$0-2],$$[$0],TipoOperador.And);
break;
case 52:
this.$ = new OperacionXpath($$[$0-2],$$[$0],TipoOperador.Or);
break;
case 53:
this.$ = $$[$0-1].Operacion;
break;
case 54:
this.$ = new ParametroOperacionXpath(null,$$[$0],TipoParametro.Decimal);
break;
case 55:
this.$ = new ParametroOperacionXpath(null,$$[$0],TipoParametro.Entero);
break;
case 56:
this.$ = new NodoXpath(TipoNodo.Axis,$$[$0-3],$$[$0]); 
break;
}
},
table: [{3:1,4:2,6:3,8:4,12:5,13:$V0,14:$V1,15:$V2,16:$V3,17:$V4,18:$V5,19:12,50:13,53:$V6,54:$V7,55:$V8,56:$V9,57:$Va,58:$Vb,59:$Vc,60:$Vd,61:$Ve,62:$Vf,63:$Vg,64:$Vh,65:$Vi},{1:[3]},{5:[1,27]},{5:[2,2],7:[1,28]},o($Vj,[2,4],{50:13,9:29,10:30,21:31,19:36,20:37,13:$Vk,14:$Vl,15:$Vm,16:$Vn,17:$Vo,18:$Vp,22:$Vq,25:$Vr,29:$Vs,53:$V6,54:$V7,55:$V8,56:$V9,57:$Va,58:$Vb,59:$Vc,60:$Vd,61:$Ve,62:$Vf,63:$Vg,64:$Vh,65:$Vi}),o($Vt,$Vu,{11:43,26:$Vv}),o($Vw,[2,8]),o($Vw,[2,9]),o($Vw,[2,10]),o($Vw,[2,11]),o($Vw,[2,12]),o($Vw,[2,13]),o($Vw,[2,14]),{51:[1,45]},{51:[2,57]},{51:[2,58]},{51:[2,59]},{51:[2,60]},{51:[2,61]},{51:[2,62]},{51:[2,63]},{51:[2,64]},{51:[2,65]},{51:[2,66]},{51:[2,67]},{51:[2,68]},{51:[2,69]},{1:[2,1]},{8:46,12:5,13:$V0,14:$V1,15:$V2,16:$V3,17:$V4,18:$V5,19:12,50:13,53:$V6,54:$V7,55:$V8,56:$V9,57:$Va,58:$Vb,59:$Vc,60:$Vd,61:$Ve,62:$Vf,63:$Vg,64:$Vh,65:$Vi},o($Vt,[2,5]),o($Vt,$Vu,{11:47,26:$Vv}),o($Vt,[2,21]),o($Vt,[2,22]),o($Vt,[2,23]),o($Vw,[2,15]),o($Vw,[2,16]),o($Vw,[2,17]),o($Vw,[2,18]),o($Vw,[2,19]),o($Vw,[2,20]),{23:[1,48]},{23:[1,49]},{15:[1,51],16:[1,50]},o($Vt,[2,7]),{16:$Vx,17:$Vy,18:$Vz,20:58,23:$VA,27:52,29:$Vs,30:53,31:$VB,32:$VC,33:54,34:55,35:$VD,48:$VE,49:$VF},{51:[1,66]},o($Vj,[2,3],{50:13,9:29,10:30,21:31,19:36,20:37,13:$Vk,14:$Vl,15:$Vm,16:$Vn,17:$Vo,18:$Vp,22:$Vq,25:$Vr,29:$Vs,53:$V6,54:$V7,55:$V8,56:$V9,57:$Va,58:$Vb,59:$Vc,60:$Vd,61:$Ve,62:$Vf,63:$Vg,64:$Vh,65:$Vi}),o($Vt,[2,6]),{24:[1,67]},{24:[1,68]},o($VG,[2,28]),o($VG,[2,29]),{15:$VH,28:[1,69],36:$VI,37:$VJ,38:$VK,39:$VL,40:$VM,41:$VN,42:$VO,43:$VP,44:$VQ,45:$VR,46:$VS,47:$VT},o($VU,[2,32]),o($VU,[2,33]),o($VU,[2,34]),o($VU,[2,35]),o($VU,[2,36]),o($VU,[2,37]),o($VU,[2,38]),o($VU,[2,39]),{23:[1,83]},{23:[1,84]},o($VU,[2,54]),o($VU,[2,55]),{16:$Vx,17:$Vy,18:$Vz,20:58,23:$VA,27:85,29:$Vs,30:53,31:$VB,32:$VC,33:54,34:55,35:$VD,48:$VE,49:$VF},{15:[1,89],16:[1,87],21:88,22:$Vq,25:$Vr,52:86},o($Vw,[2,24]),o($Vw,[2,25]),o($Vt,[2,26]),{16:$Vx,17:$Vy,18:$Vz,20:58,23:$VA,27:90,29:$Vs,30:53,31:$VB,32:$VC,33:54,34:55,35:$VD,48:$VE,49:$VF},{16:$Vx,17:$Vy,18:$Vz,20:58,23:$VA,27:91,29:$Vs,30:53,31:$VB,32:$VC,33:54,34:55,35:$VD,48:$VE,49:$VF},{16:$Vx,17:$Vy,18:$Vz,20:58,23:$VA,27:92,29:$Vs,30:53,31:$VB,32:$VC,33:54,34:55,35:$VD,48:$VE,49:$VF},{16:$Vx,17:$Vy,18:$Vz,20:58,23:$VA,27:93,29:$Vs,30:53,31:$VB,32:$VC,33:54,34:55,35:$VD,48:$VE,49:$VF},{16:$Vx,17:$Vy,18:$Vz,20:58,23:$VA,27:94,29:$Vs,30:53,31:$VB,32:$VC,33:54,34:55,35:$VD,48:$VE,49:$VF},{16:$Vx,17:$Vy,18:$Vz,20:58,23:$VA,27:95,29:$Vs,30:53,31:$VB,32:$VC,33:54,34:55,35:$VD,48:$VE,49:$VF},{16:$Vx,17:$Vy,18:$Vz,20:58,23:$VA,27:96,29:$Vs,30:53,31:$VB,32:$VC,33:54,34:55,35:$VD,48:$VE,49:$VF},{16:$Vx,17:$Vy,18:$Vz,20:58,23:$VA,27:97,29:$Vs,30:53,31:$VB,32:$VC,33:54,34:55,35:$VD,48:$VE,49:$VF},{16:$Vx,17:$Vy,18:$Vz,20:58,23:$VA,27:98,29:$Vs,30:53,31:$VB,32:$VC,33:54,34:55,35:$VD,48:$VE,49:$VF},{16:$Vx,17:$Vy,18:$Vz,20:58,23:$VA,27:99,29:$Vs,30:53,31:$VB,32:$VC,33:54,34:55,35:$VD,48:$VE,49:$VF},{16:$Vx,17:$Vy,18:$Vz,20:58,23:$VA,27:100,29:$Vs,30:53,31:$VB,32:$VC,33:54,34:55,35:$VD,48:$VE,49:$VF},{16:$Vx,17:$Vy,18:$Vz,20:58,23:$VA,27:101,29:$Vs,30:53,31:$VB,32:$VC,33:54,34:55,35:$VD,48:$VE,49:$VF},{16:$Vx,17:$Vy,18:$Vz,20:58,23:$VA,27:102,29:$Vs,30:53,31:$VB,32:$VC,33:54,34:55,35:$VD,48:$VE,49:$VF},{24:[1,103]},{24:[1,104]},{15:$VH,24:[1,105],36:$VI,37:$VJ,38:$VK,39:$VL,40:$VM,41:$VN,42:$VO,43:$VP,44:$VQ,45:$VR,46:$VS,47:$VT},o($Vw,[2,56]),o($Vw,[2,70]),o($Vw,[2,71]),o($Vw,[2,72]),o($VV,[2,40],{15:$VH,38:$VK,39:$VL}),o($VV,[2,41],{15:$VH,38:$VK,39:$VL}),o($VU,[2,42]),o($VU,[2,43]),o($VU,[2,44]),o($VW,[2,45],{15:$VH,36:$VI,37:$VJ,38:$VK,39:$VL}),o($VW,[2,46],{15:$VH,36:$VI,37:$VJ,38:$VK,39:$VL}),o($VW,[2,47],{15:$VH,36:$VI,37:$VJ,38:$VK,39:$VL}),o($VW,[2,48],{15:$VH,36:$VI,37:$VJ,38:$VK,39:$VL}),o($VW,[2,49],{15:$VH,36:$VI,37:$VJ,38:$VK,39:$VL}),o($VW,[2,50],{15:$VH,36:$VI,37:$VJ,38:$VK,39:$VL}),o([24,28,46,47],[2,51],{15:$VH,36:$VI,37:$VJ,38:$VK,39:$VL,40:$VM,41:$VN,42:$VO,43:$VP,44:$VQ,45:$VR}),o([24,28,47],[2,52],{15:$VH,36:$VI,37:$VJ,38:$VK,39:$VL,40:$VM,41:$VN,42:$VO,43:$VP,44:$VQ,45:$VR,46:$VS}),o($VU,[2,30]),o($VU,[2,31]),o($VU,[2,53])],
defaultActions: {14:[2,57],15:[2,58],16:[2,59],17:[2,60],18:[2,61],19:[2,62],20:[2,63],21:[2,64],22:[2,65],23:[2,66],24:[2,67],25:[2,68],26:[2,69],27:[2,1]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

        const {sentenciaXpath} = require("../Estructuras/sentenciaXpath.js");
        const {parametroXpath} = require("../Estructuras/parametroXpath.js");
        const {ParametroOperacionXpath} = require("../Estructuras/ParametroOperacionXpath.js");
        const {OperacionXpath} = require("../Estructuras/OperacionXpath.js");
        const {NodoXpath} = require("../Estructuras/NodoXpath.js");
        const {TipoParametro, TipoOperador, TipoNodo} = require("../Estructuras/tipificacion.js");
        let salida = [];
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* skip whitespace */
break;
case 1:return 13;
break;
case 2:// comentario simple línea
break;
case 3:// comentario multiple líneas
break;
case 4:return 49
break;
case 5:return 35
break;
case 6:return 'CARACTER_LITERAL'
break;
case 7:return 53;
break;
case 8:return 54;
break;
case 9:return 55;
break;
case 10:return 56;
break;
case 11:return 57;
break;
case 12:return 58;
break;
case 13:return 59;
break;
case 14:return 60;
break;
case 15:return 61;
break;
case 16:return 62;
break;
case 17:return 63;
break;
case 18:return 64;
break;
case 19:return 65;
break;
case 20:return 31;
break;
case 21:return 32;
break;
case 22:return 25;
break;
case 23:return 22;
break;
case 24:return 39;
break;
case 25:return 38;
break;
case 26:return 36;
break;
case 27:return 37;
break;
case 28:return 15;
break;
case 29:return 40;
break;
case 30:return 41;
break;
case 31:return 43;
break;
case 32:return 42;
break;
case 33:return 44;
break;
case 34:return 'equal';
break;
case 35:return 45;
break;
case 36:return 46;
break;
case 37:return 47;
break;
case 38:return 'not';
break;
case 39:return 51;
break;
case 40:return 'semicolon';
break;
case 41:return 26;
break;
case 42:return 28;
break;
case 43:return 29;
break;
case 44:return 46;
break;
case 45:return 7;
break;
case 46:return 23;
break;
case 47:return 24;
break;
case 48:return 48;
break;
case 49:return 'IntegerLiteral';
break;
case 50:return 'string';
break;
case 51:return 16;
break;
case 52:return 14;
break;
case 53:return 17
break;
case 54:return 18
break;
case 55:return 5
break;
case 56:return 'INVALID'
break;
}
},
rules: [/^(?:\s+)/i,/^(?:\/\/)/i,/^(?:\/\/.*)/i,/^(?:[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/])/i,/^(?:([0-9]+(\.[0-9]+)?))/i,/^(?:(("(\\"|[^"]|\n)*")))/i,/^(?:(('[^']*')))/i,/^(?:ancestor\b)/i,/^(?:ancestor-or-self\b)/i,/^(?:attribute\b)/i,/^(?:child\b)/i,/^(?:descendant\b)/i,/^(?:descendant-or-self\b)/i,/^(?:following\b)/i,/^(?:following-sibling\b)/i,/^(?:namespace\b)/i,/^(?:parent\b)/i,/^(?:preceding\b)/i,/^(?:preceding-sibling\b)/i,/^(?:self\b)/i,/^(?:last\b)/i,/^(?:position\b)/i,/^(?:text\b)/i,/^(?:node\b)/i,/^(?:div\b)/i,/^(?:mod\b)/i,/^(?:\+)/i,/^(?:-)/i,/^(?:\*)/i,/^(?:<=)/i,/^(?:>=)/i,/^(?:<)/i,/^(?:>)/i,/^(?:=)/i,/^(?:==)/i,/^(?:!=)/i,/^(?:and\b)/i,/^(?:or\b)/i,/^(?:!)/i,/^(?::)/i,/^(?:;)/i,/^(?:\[)/i,/^(?:\])/i,/^(?:@)/i,/^(?:&&)/i,/^(?:\|)/i,/^(?:\()/i,/^(?:\))/i,/^(?:(([0-9]+\.[0-9]*)|(\.[0-9]+)))/i,/^(?:[0-9]+)/i,/^(?:"[^\"]*")/i,/^(?:[a-zA-Z_][a-zA-Z0-9_ñÑ]*)/i,/^(?:\/)/i,/^(?:\.\.)/i,/^(?:\.)/i,/^(?:$)/i,/^(?:.)/i],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = xpathGramatica;
exports.Parser = xpathGramatica.Parser;
exports.parse = function () { return xpathGramatica.parse.apply(xpathGramatica, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}