var Et=Object.create;var Pe=Object.defineProperty;var Bt=Object.getOwnPropertyDescriptor;var Ot=Object.getOwnPropertyNames;var jt=Object.getPrototypeOf,Mt=Object.prototype.hasOwnProperty;var Xe=t=>Pe(t,"__esModule",{value:!0});var be=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),Gt=(t,e)=>{Xe(t);for(var o in e)Pe(t,o,{get:e[o],enumerable:!0})},qt=(t,e,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Ot(e))!Mt.call(t,s)&&s!=="default"&&Pe(t,s,{get:()=>e[s],enumerable:!(o=Bt(e,s))||o.enumerable});return t},le=t=>qt(Xe(Pe(t!=null?Et(jt(t)):{},"default",t&&t.__esModule&&"default"in t?{get:()=>t.default,enumerable:!0}:{value:t,enumerable:!0})),t);var et=be(xe=>{(function(t){t.parser=function(i,a){return new o(i,a)},t.SAXParser=o,t.SAXStream=c,t.createStream=W,t.MAX_BUFFER_LENGTH=64*1024;var e=["comment","sgmlDecl","textNode","tagName","doctype","procInstName","procInstBody","entity","attribName","attribValue","cdata","script"];t.EVENTS=["text","processinginstruction","sgmldeclaration","doctype","comment","opentagstart","attribute","opentag","closetag","opencdata","cdata","closecdata","error","end","ready","script","opennamespace","closenamespace"];function o(i,a){if(!(this instanceof o))return new o(i,a);var h=this;d(h),h.q=h.c="",h.bufferCheckPosition=t.MAX_BUFFER_LENGTH,h.opt=a||{},h.opt.lowercase=h.opt.lowercase||h.opt.lowercasetags,h.looseCase=h.opt.lowercase?"toLowerCase":"toUpperCase",h.tags=[],h.closed=h.closedRoot=h.sawRoot=!1,h.tag=h.error=null,h.strict=!!i,h.noscript=!!(i||h.opt.noscript),h.state=r.BEGIN,h.strictEntities=h.opt.strictEntities,h.ENTITIES=h.strictEntities?Object.create(t.XML_ENTITIES):Object.create(t.ENTITIES),h.attribList=[],h.opt.xmlns&&(h.ns=Object.create(M)),h.trackPosition=h.opt.position!==!1,h.trackPosition&&(h.position=h.line=h.column=0),ae(h,"onready")}Object.create||(Object.create=function(i){function a(){}a.prototype=i;var h=new a;return h}),Object.keys||(Object.keys=function(i){var a=[];for(var h in i)i.hasOwnProperty(h)&&a.push(h);return a});function s(i){for(var a=Math.max(t.MAX_BUFFER_LENGTH,10),h=0,n=0,f=e.length;n<f;n++){var y=i[e[n]].length;if(y>a)switch(e[n]){case"textNode":se(i);break;case"cdata":L(i,"oncdata",i.cdata),i.cdata="";break;case"script":L(i,"onscript",i.script),i.script="";break;default:X(i,"Max buffer length exceeded: "+e[n])}h=Math.max(h,y)}var N=t.MAX_BUFFER_LENGTH-h;i.bufferCheckPosition=N+i.position}function d(i){for(var a=0,h=e.length;a<h;a++)i[e[a]]=""}function m(i){se(i),i.cdata!==""&&(L(i,"oncdata",i.cdata),i.cdata=""),i.script!==""&&(L(i,"onscript",i.script),i.script="")}o.prototype={end:function(){ie(this)},write:Ae,resume:function(){return this.error=null,this},close:function(){return this.write(null)},flush:function(){m(this)}};var u;try{u=require("stream").Stream}catch(i){u=function(){}}var v=t.EVENTS.filter(function(i){return i!=="error"&&i!=="end"});function W(i,a){return new c(i,a)}function c(i,a){if(!(this instanceof c))return new c(i,a);u.apply(this),this._parser=new o(i,a),this.writable=!0,this.readable=!0;var h=this;this._parser.onend=function(){h.emit("end")},this._parser.onerror=function(n){h.emit("error",n),h._parser.error=null},this._decoder=null,v.forEach(function(n){Object.defineProperty(h,"on"+n,{get:function(){return h._parser["on"+n]},set:function(f){if(!f)return h.removeAllListeners(n),h._parser["on"+n]=f,f;h.on(n,f)},enumerable:!0,configurable:!1})})}c.prototype=Object.create(u.prototype,{constructor:{value:c}}),c.prototype.write=function(i){if(typeof Buffer=="function"&&typeof Buffer.isBuffer=="function"&&Buffer.isBuffer(i)){if(!this._decoder){var a=require("string_decoder").StringDecoder;this._decoder=new a("utf8")}i=this._decoder.write(i)}return this._parser.write(i.toString()),this.emit("data",i),!0},c.prototype.end=function(i){return i&&i.length&&this.write(i),this._parser.end(),!0},c.prototype.on=function(i,a){var h=this;return!h._parser["on"+i]&&v.indexOf(i)!==-1&&(h._parser["on"+i]=function(){var n=arguments.length===1?[arguments[0]]:Array.apply(null,arguments);n.splice(0,0,i),h.emit.apply(h,n)}),u.prototype.on.call(h,i,a)};var D="[CDATA[",E="DOCTYPE",O="http://www.w3.org/XML/1998/namespace",P="http://www.w3.org/2000/xmlns/",M={xml:O,xmlns:P},k=/[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,A=/[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/,T=/[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,G=/[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;function b(i){return i===" "||i===`
`||i==="\r"||i==="	"}function R(i){return i==='"'||i==="'"}function S(i){return i===">"||b(i)}function g(i,a){return i.test(a)}function _(i,a){return!g(i,a)}var r=0;t.STATE={BEGIN:r++,BEGIN_WHITESPACE:r++,TEXT:r++,TEXT_ENTITY:r++,OPEN_WAKA:r++,SGML_DECL:r++,SGML_DECL_QUOTED:r++,DOCTYPE:r++,DOCTYPE_QUOTED:r++,DOCTYPE_DTD:r++,DOCTYPE_DTD_QUOTED:r++,COMMENT_STARTING:r++,COMMENT:r++,COMMENT_ENDING:r++,COMMENT_ENDED:r++,CDATA:r++,CDATA_ENDING:r++,CDATA_ENDING_2:r++,PROC_INST:r++,PROC_INST_BODY:r++,PROC_INST_ENDING:r++,OPEN_TAG:r++,OPEN_TAG_SLASH:r++,ATTRIB:r++,ATTRIB_NAME:r++,ATTRIB_NAME_SAW_WHITE:r++,ATTRIB_VALUE:r++,ATTRIB_VALUE_QUOTED:r++,ATTRIB_VALUE_CLOSED:r++,ATTRIB_VALUE_UNQUOTED:r++,ATTRIB_VALUE_ENTITY_Q:r++,ATTRIB_VALUE_ENTITY_U:r++,CLOSE_TAG:r++,CLOSE_TAG_SAW_WHITE:r++,SCRIPT:r++,SCRIPT_ENDING:r++},t.XML_ENTITIES={amp:"&",gt:">",lt:"<",quot:'"',apos:"'"},t.ENTITIES={amp:"&",gt:">",lt:"<",quot:'"',apos:"'",AElig:198,Aacute:193,Acirc:194,Agrave:192,Aring:197,Atilde:195,Auml:196,Ccedil:199,ETH:208,Eacute:201,Ecirc:202,Egrave:200,Euml:203,Iacute:205,Icirc:206,Igrave:204,Iuml:207,Ntilde:209,Oacute:211,Ocirc:212,Ograve:210,Oslash:216,Otilde:213,Ouml:214,THORN:222,Uacute:218,Ucirc:219,Ugrave:217,Uuml:220,Yacute:221,aacute:225,acirc:226,aelig:230,agrave:224,aring:229,atilde:227,auml:228,ccedil:231,eacute:233,ecirc:234,egrave:232,eth:240,euml:235,iacute:237,icirc:238,igrave:236,iuml:239,ntilde:241,oacute:243,ocirc:244,ograve:242,oslash:248,otilde:245,ouml:246,szlig:223,thorn:254,uacute:250,ucirc:251,ugrave:249,uuml:252,yacute:253,yuml:255,copy:169,reg:174,nbsp:160,iexcl:161,cent:162,pound:163,curren:164,yen:165,brvbar:166,sect:167,uml:168,ordf:170,laquo:171,not:172,shy:173,macr:175,deg:176,plusmn:177,sup1:185,sup2:178,sup3:179,acute:180,micro:181,para:182,middot:183,cedil:184,ordm:186,raquo:187,frac14:188,frac12:189,frac34:190,iquest:191,times:215,divide:247,OElig:338,oelig:339,Scaron:352,scaron:353,Yuml:376,fnof:402,circ:710,tilde:732,Alpha:913,Beta:914,Gamma:915,Delta:916,Epsilon:917,Zeta:918,Eta:919,Theta:920,Iota:921,Kappa:922,Lambda:923,Mu:924,Nu:925,Xi:926,Omicron:927,Pi:928,Rho:929,Sigma:931,Tau:932,Upsilon:933,Phi:934,Chi:935,Psi:936,Omega:937,alpha:945,beta:946,gamma:947,delta:948,epsilon:949,zeta:950,eta:951,theta:952,iota:953,kappa:954,lambda:955,mu:956,nu:957,xi:958,omicron:959,pi:960,rho:961,sigmaf:962,sigma:963,tau:964,upsilon:965,phi:966,chi:967,psi:968,omega:969,thetasym:977,upsih:978,piv:982,ensp:8194,emsp:8195,thinsp:8201,zwnj:8204,zwj:8205,lrm:8206,rlm:8207,ndash:8211,mdash:8212,lsquo:8216,rsquo:8217,sbquo:8218,ldquo:8220,rdquo:8221,bdquo:8222,dagger:8224,Dagger:8225,bull:8226,hellip:8230,permil:8240,prime:8242,Prime:8243,lsaquo:8249,rsaquo:8250,oline:8254,frasl:8260,euro:8364,image:8465,weierp:8472,real:8476,trade:8482,alefsym:8501,larr:8592,uarr:8593,rarr:8594,darr:8595,harr:8596,crarr:8629,lArr:8656,uArr:8657,rArr:8658,dArr:8659,hArr:8660,forall:8704,part:8706,exist:8707,empty:8709,nabla:8711,isin:8712,notin:8713,ni:8715,prod:8719,sum:8721,minus:8722,lowast:8727,radic:8730,prop:8733,infin:8734,ang:8736,and:8743,or:8744,cap:8745,cup:8746,int:8747,there4:8756,sim:8764,cong:8773,asymp:8776,ne:8800,equiv:8801,le:8804,ge:8805,sub:8834,sup:8835,nsub:8836,sube:8838,supe:8839,oplus:8853,otimes:8855,perp:8869,sdot:8901,lceil:8968,rceil:8969,lfloor:8970,rfloor:8971,lang:9001,rang:9002,loz:9674,spades:9824,clubs:9827,hearts:9829,diams:9830},Object.keys(t.ENTITIES).forEach(function(i){var a=t.ENTITIES[i],h=typeof a=="number"?String.fromCharCode(a):a;t.ENTITIES[i]=h});for(var te in t.STATE)t.STATE[t.STATE[te]]=te;r=t.STATE;function ae(i,a,h){i[a]&&i[a](h)}function L(i,a,h){i.textNode&&se(i),ae(i,a,h)}function se(i){i.textNode=K(i.opt,i.textNode),i.textNode&&ae(i,"ontext",i.textNode),i.textNode=""}function K(i,a){return i.trim&&(a=a.trim()),i.normalize&&(a=a.replace(/\s+/g," ")),a}function X(i,a){return se(i),i.trackPosition&&(a+=`
Line: `+i.line+`
Column: `+i.column+`
Char: `+i.c),a=new Error(a),i.error=a,ae(i,"onerror",a),i}function ie(i){return i.sawRoot&&!i.closedRoot&&V(i,"Unclosed root tag"),i.state!==r.BEGIN&&i.state!==r.BEGIN_WHITESPACE&&i.state!==r.TEXT&&X(i,"Unexpected end"),se(i),i.c="",i.closed=!0,ae(i,"onend"),o.call(i,i.strict,i.opt),i}function V(i,a){if(typeof i!="object"||!(i instanceof o))throw new Error("bad call to strictFail");i.strict&&X(i,a)}function oe(i){i.strict||(i.tagName=i.tagName[i.looseCase]());var a=i.tags[i.tags.length-1]||i,h=i.tag={name:i.tagName,attributes:{}};i.opt.xmlns&&(h.ns=a.ns),i.attribList.length=0,L(i,"onopentagstart",h)}function de(i,a){var h=i.indexOf(":"),n=h<0?["",i]:i.split(":"),f=n[0],y=n[1];return a&&i==="xmlns"&&(f="xmlns",y=""),{prefix:f,local:y}}function ce(i){if(i.strict||(i.attribName=i.attribName[i.looseCase]()),i.attribList.indexOf(i.attribName)!==-1||i.tag.attributes.hasOwnProperty(i.attribName)){i.attribName=i.attribValue="";return}if(i.opt.xmlns){var a=de(i.attribName,!0),h=a.prefix,n=a.local;if(h==="xmlns")if(n==="xml"&&i.attribValue!==O)V(i,"xml: prefix must be bound to "+O+`
Actual: `+i.attribValue);else if(n==="xmlns"&&i.attribValue!==P)V(i,"xmlns: prefix must be bound to "+P+`
Actual: `+i.attribValue);else{var f=i.tag,y=i.tags[i.tags.length-1]||i;f.ns===y.ns&&(f.ns=Object.create(y.ns)),f.ns[n]=i.attribValue}i.attribList.push([i.attribName,i.attribValue])}else i.tag.attributes[i.attribName]=i.attribValue,L(i,"onattribute",{name:i.attribName,value:i.attribValue});i.attribName=i.attribValue=""}function z(i,a){if(i.opt.xmlns){var h=i.tag,n=de(i.tagName);h.prefix=n.prefix,h.local=n.local,h.uri=h.ns[n.prefix]||"",h.prefix&&!h.uri&&(V(i,"Unbound namespace prefix: "+JSON.stringify(i.tagName)),h.uri=n.prefix);var f=i.tags[i.tags.length-1]||i;h.ns&&f.ns!==h.ns&&Object.keys(h.ns).forEach(function(Je){L(i,"onopennamespace",{prefix:Je,uri:h.ns[Je]})});for(var y=0,N=i.attribList.length;y<N;y++){var U=i.attribList[y],C=U[0],x=U[1],Q=de(C,!0),J=Q.prefix,ge=Q.local,Ze=J===""?"":h.ns[J]||"",Be={name:C,value:x,prefix:J,local:ge,uri:Ze};J&&J!=="xmlns"&&!Ze&&(V(i,"Unbound namespace prefix: "+JSON.stringify(J)),Be.uri=J),i.tag.attributes[C]=Be,L(i,"onattribute",Be)}i.attribList.length=0}i.tag.isSelfClosing=!!a,i.sawRoot=!0,i.tags.push(i.tag),L(i,"onopentag",i.tag),a||(!i.noscript&&i.tagName.toLowerCase()==="script"?i.state=r.SCRIPT:i.state=r.TEXT,i.tag=null,i.tagName=""),i.attribName=i.attribValue="",i.attribList.length=0}function Z(i){if(!i.tagName){V(i,"Weird empty close tag."),i.textNode+="</>",i.state=r.TEXT;return}if(i.script){if(i.tagName!=="script"){i.script+="</"+i.tagName+">",i.tagName="",i.state=r.SCRIPT;return}L(i,"onscript",i.script),i.script=""}var a=i.tags.length,h=i.tagName;i.strict||(h=h[i.looseCase]());for(var n=h;a--;){var f=i.tags[a];if(f.name!==n)V(i,"Unexpected close tag");else break}if(a<0){V(i,"Unmatched closing tag: "+i.tagName),i.textNode+="</"+i.tagName+">",i.state=r.TEXT;return}i.tagName=h;for(var y=i.tags.length;y-- >a;){var N=i.tag=i.tags.pop();i.tagName=i.tag.name,L(i,"onclosetag",i.tagName);var U={};for(var C in N.ns)U[C]=N.ns[C];var x=i.tags[i.tags.length-1]||i;i.opt.xmlns&&N.ns!==x.ns&&Object.keys(N.ns).forEach(function(Q){var J=N.ns[Q];L(i,"onclosenamespace",{prefix:Q,uri:J})})}a===0&&(i.closedRoot=!0),i.tagName=i.attribValue=i.attribName="",i.attribList.length=0,i.state=r.TEXT}function ne(i){var a=i.entity,h=a.toLowerCase(),n,f="";return i.ENTITIES[a]?i.ENTITIES[a]:i.ENTITIES[h]?i.ENTITIES[h]:(a=h,a.charAt(0)==="#"&&(a.charAt(1)==="x"?(a=a.slice(2),n=parseInt(a,16),f=n.toString(16)):(a=a.slice(1),n=parseInt(a,10),f=n.toString(10))),a=a.replace(/^0+/,""),isNaN(n)||f.toLowerCase()!==a?(V(i,"Invalid character entity"),"&"+i.entity+";"):String.fromCodePoint(n))}function $(i,a){a==="<"?(i.state=r.OPEN_WAKA,i.startTagPosition=i.position):b(a)||(V(i,"Non-whitespace before first tag."),i.textNode=a,i.state=r.TEXT)}function Re(i,a){var h="";return a<i.length&&(h=i.charAt(a)),h}function Ae(i){var a=this;if(this.error)throw this.error;if(a.closed)return X(a,"Cannot write after close. Assign an onready handler.");if(i===null)return ie(a);typeof i=="object"&&(i=i.toString());for(var h=0,n="";n=Re(i,h++),a.c=n,!!n;)switch(a.trackPosition&&(a.position++,n===`
`?(a.line++,a.column=0):a.column++),a.state){case r.BEGIN:if(a.state=r.BEGIN_WHITESPACE,n==="\uFEFF")continue;$(a,n);continue;case r.BEGIN_WHITESPACE:$(a,n);continue;case r.TEXT:if(a.sawRoot&&!a.closedRoot){for(var f=h-1;n&&n!=="<"&&n!=="&";)n=Re(i,h++),n&&a.trackPosition&&(a.position++,n===`
`?(a.line++,a.column=0):a.column++);a.textNode+=i.substring(f,h-1)}n==="<"&&!(a.sawRoot&&a.closedRoot&&!a.strict)?(a.state=r.OPEN_WAKA,a.startTagPosition=a.position):(!b(n)&&(!a.sawRoot||a.closedRoot)&&V(a,"Text data outside of root node."),n==="&"?a.state=r.TEXT_ENTITY:a.textNode+=n);continue;case r.SCRIPT:n==="<"?a.state=r.SCRIPT_ENDING:a.script+=n;continue;case r.SCRIPT_ENDING:n==="/"?a.state=r.CLOSE_TAG:(a.script+="<"+n,a.state=r.SCRIPT);continue;case r.OPEN_WAKA:if(n==="!")a.state=r.SGML_DECL,a.sgmlDecl="";else if(!b(n))if(g(k,n))a.state=r.OPEN_TAG,a.tagName=n;else if(n==="/")a.state=r.CLOSE_TAG,a.tagName="";else if(n==="?")a.state=r.PROC_INST,a.procInstName=a.procInstBody="";else{if(V(a,"Unencoded <"),a.startTagPosition+1<a.position){var y=a.position-a.startTagPosition;n=new Array(y).join(" ")+n}a.textNode+="<"+n,a.state=r.TEXT}continue;case r.SGML_DECL:(a.sgmlDecl+n).toUpperCase()===D?(L(a,"onopencdata"),a.state=r.CDATA,a.sgmlDecl="",a.cdata=""):a.sgmlDecl+n==="--"?(a.state=r.COMMENT,a.comment="",a.sgmlDecl=""):(a.sgmlDecl+n).toUpperCase()===E?(a.state=r.DOCTYPE,(a.doctype||a.sawRoot)&&V(a,"Inappropriately located doctype declaration"),a.doctype="",a.sgmlDecl=""):n===">"?(L(a,"onsgmldeclaration",a.sgmlDecl),a.sgmlDecl="",a.state=r.TEXT):(R(n)&&(a.state=r.SGML_DECL_QUOTED),a.sgmlDecl+=n);continue;case r.SGML_DECL_QUOTED:n===a.q&&(a.state=r.SGML_DECL,a.q=""),a.sgmlDecl+=n;continue;case r.DOCTYPE:n===">"?(a.state=r.TEXT,L(a,"ondoctype",a.doctype),a.doctype=!0):(a.doctype+=n,n==="["?a.state=r.DOCTYPE_DTD:R(n)&&(a.state=r.DOCTYPE_QUOTED,a.q=n));continue;case r.DOCTYPE_QUOTED:a.doctype+=n,n===a.q&&(a.q="",a.state=r.DOCTYPE);continue;case r.DOCTYPE_DTD:a.doctype+=n,n==="]"?a.state=r.DOCTYPE:R(n)&&(a.state=r.DOCTYPE_DTD_QUOTED,a.q=n);continue;case r.DOCTYPE_DTD_QUOTED:a.doctype+=n,n===a.q&&(a.state=r.DOCTYPE_DTD,a.q="");continue;case r.COMMENT:n==="-"?a.state=r.COMMENT_ENDING:a.comment+=n;continue;case r.COMMENT_ENDING:n==="-"?(a.state=r.COMMENT_ENDED,a.comment=K(a.opt,a.comment),a.comment&&L(a,"oncomment",a.comment),a.comment=""):(a.comment+="-"+n,a.state=r.COMMENT);continue;case r.COMMENT_ENDED:n!==">"?(V(a,"Malformed comment"),a.comment+="--"+n,a.state=r.COMMENT):a.state=r.TEXT;continue;case r.CDATA:n==="]"?a.state=r.CDATA_ENDING:a.cdata+=n;continue;case r.CDATA_ENDING:n==="]"?a.state=r.CDATA_ENDING_2:(a.cdata+="]"+n,a.state=r.CDATA);continue;case r.CDATA_ENDING_2:n===">"?(a.cdata&&L(a,"oncdata",a.cdata),L(a,"onclosecdata"),a.cdata="",a.state=r.TEXT):n==="]"?a.cdata+="]":(a.cdata+="]]"+n,a.state=r.CDATA);continue;case r.PROC_INST:n==="?"?a.state=r.PROC_INST_ENDING:b(n)?a.state=r.PROC_INST_BODY:a.procInstName+=n;continue;case r.PROC_INST_BODY:if(!a.procInstBody&&b(n))continue;n==="?"?a.state=r.PROC_INST_ENDING:a.procInstBody+=n;continue;case r.PROC_INST_ENDING:n===">"?(L(a,"onprocessinginstruction",{name:a.procInstName,body:a.procInstBody}),a.procInstName=a.procInstBody="",a.state=r.TEXT):(a.procInstBody+="?"+n,a.state=r.PROC_INST_BODY);continue;case r.OPEN_TAG:g(A,n)?a.tagName+=n:(oe(a),n===">"?z(a):n==="/"?a.state=r.OPEN_TAG_SLASH:(b(n)||V(a,"Invalid character in tag name"),a.state=r.ATTRIB));continue;case r.OPEN_TAG_SLASH:n===">"?(z(a,!0),Z(a)):(V(a,"Forward-slash in opening tag not followed by >"),a.state=r.ATTRIB);continue;case r.ATTRIB:if(b(n))continue;n===">"?z(a):n==="/"?a.state=r.OPEN_TAG_SLASH:g(k,n)?(a.attribName=n,a.attribValue="",a.state=r.ATTRIB_NAME):V(a,"Invalid attribute name");continue;case r.ATTRIB_NAME:n==="="?a.state=r.ATTRIB_VALUE:n===">"?(V(a,"Attribute without value"),a.attribValue=a.attribName,ce(a),z(a)):b(n)?a.state=r.ATTRIB_NAME_SAW_WHITE:g(A,n)?a.attribName+=n:V(a,"Invalid attribute name");continue;case r.ATTRIB_NAME_SAW_WHITE:if(n==="=")a.state=r.ATTRIB_VALUE;else{if(b(n))continue;V(a,"Attribute without value"),a.tag.attributes[a.attribName]="",a.attribValue="",L(a,"onattribute",{name:a.attribName,value:""}),a.attribName="",n===">"?z(a):g(k,n)?(a.attribName=n,a.state=r.ATTRIB_NAME):(V(a,"Invalid attribute name"),a.state=r.ATTRIB)}continue;case r.ATTRIB_VALUE:if(b(n))continue;R(n)?(a.q=n,a.state=r.ATTRIB_VALUE_QUOTED):(V(a,"Unquoted attribute value"),a.state=r.ATTRIB_VALUE_UNQUOTED,a.attribValue=n);continue;case r.ATTRIB_VALUE_QUOTED:if(n!==a.q){n==="&"?a.state=r.ATTRIB_VALUE_ENTITY_Q:a.attribValue+=n;continue}ce(a),a.q="",a.state=r.ATTRIB_VALUE_CLOSED;continue;case r.ATTRIB_VALUE_CLOSED:b(n)?a.state=r.ATTRIB:n===">"?z(a):n==="/"?a.state=r.OPEN_TAG_SLASH:g(k,n)?(V(a,"No whitespace between attributes"),a.attribName=n,a.attribValue="",a.state=r.ATTRIB_NAME):V(a,"Invalid attribute name");continue;case r.ATTRIB_VALUE_UNQUOTED:if(!S(n)){n==="&"?a.state=r.ATTRIB_VALUE_ENTITY_U:a.attribValue+=n;continue}ce(a),n===">"?z(a):a.state=r.ATTRIB;continue;case r.CLOSE_TAG:if(a.tagName)n===">"?Z(a):g(A,n)?a.tagName+=n:a.script?(a.script+="</"+a.tagName,a.tagName="",a.state=r.SCRIPT):(b(n)||V(a,"Invalid tagname in closing tag"),a.state=r.CLOSE_TAG_SAW_WHITE);else{if(b(n))continue;_(k,n)?a.script?(a.script+="</"+n,a.state=r.SCRIPT):V(a,"Invalid tagname in closing tag."):a.tagName=n}continue;case r.CLOSE_TAG_SAW_WHITE:if(b(n))continue;n===">"?Z(a):V(a,"Invalid characters in closing tag");continue;case r.TEXT_ENTITY:case r.ATTRIB_VALUE_ENTITY_Q:case r.ATTRIB_VALUE_ENTITY_U:var N,U;switch(a.state){case r.TEXT_ENTITY:N=r.TEXT,U="textNode";break;case r.ATTRIB_VALUE_ENTITY_Q:N=r.ATTRIB_VALUE_QUOTED,U="attribValue";break;case r.ATTRIB_VALUE_ENTITY_U:N=r.ATTRIB_VALUE_UNQUOTED,U="attribValue";break}n===";"?(a[U]+=ne(a),a.entity="",a.state=N):g(a.entity.length?G:T,n)?a.entity+=n:(V(a,"Invalid character in entity name"),a[U]+="&"+a.entity+n,a.entity="",a.state=N);continue;default:throw new Error(a,"Unknown state: "+a.state)}return a.position>=a.bufferCheckPosition&&s(a),a}String.fromCodePoint||function(){var i=String.fromCharCode,a=Math.floor,h=function(){var n=16384,f=[],y,N,U=-1,C=arguments.length;if(!C)return"";for(var x="";++U<C;){var Q=Number(arguments[U]);if(!isFinite(Q)||Q<0||Q>1114111||a(Q)!==Q)throw RangeError("Invalid code point: "+Q);Q<=65535?f.push(Q):(Q-=65536,y=(Q>>10)+55296,N=Q%1024+56320,f.push(y,N)),(U+1===C||f.length>n)&&(x+=i.apply(null,f),f.length=0)}return x};Object.defineProperty?Object.defineProperty(String,"fromCodePoint",{value:h,configurable:!0,writable:!0}):String.fromCodePoint=h}()})(typeof xe=="undefined"?xe.sax={}:xe)});var Fe=be((ba,tt)=>{tt.exports={isArray:function(t){return Array.isArray?Array.isArray(t):Object.prototype.toString.call(t)==="[object Array]"}}});var ke=be((ya,at)=>{var Qt=Fe().isArray;at.exports={copyOptions:function(t){var e,o={};for(e in t)t.hasOwnProperty(e)&&(o[e]=t[e]);return o},ensureFlagExists:function(t,e){(!(t in e)||typeof e[t]!="boolean")&&(e[t]=!1)},ensureSpacesExists:function(t){(!("spaces"in t)||typeof t.spaces!="number"&&typeof t.spaces!="string")&&(t.spaces=0)},ensureAlwaysArrayExists:function(t){(!("alwaysArray"in t)||typeof t.alwaysArray!="boolean"&&!Qt(t.alwaysArray))&&(t.alwaysArray=!1)},ensureKeyExists:function(t,e){(!(t+"Key"in e)||typeof e[t+"Key"]!="string")&&(e[t+"Key"]=e.compact?"_"+t:t)},checkFnExists:function(t,e){return t+"Fn"in e}}});var je=be((Ra,ht)=>{var Wt=et(),zt={on:function(){},parse:function(){}},I=ke(),ve=Fe().isArray,l,Oe=!0,w;function Kt(t){return l=I.copyOptions(t),I.ensureFlagExists("ignoreDeclaration",l),I.ensureFlagExists("ignoreInstruction",l),I.ensureFlagExists("ignoreAttributes",l),I.ensureFlagExists("ignoreText",l),I.ensureFlagExists("ignoreComment",l),I.ensureFlagExists("ignoreCdata",l),I.ensureFlagExists("ignoreDoctype",l),I.ensureFlagExists("compact",l),I.ensureFlagExists("alwaysChildren",l),I.ensureFlagExists("addParent",l),I.ensureFlagExists("trim",l),I.ensureFlagExists("nativeType",l),I.ensureFlagExists("nativeTypeAttributes",l),I.ensureFlagExists("sanitize",l),I.ensureFlagExists("instructionHasAttributes",l),I.ensureFlagExists("captureSpacesBetweenElements",l),I.ensureAlwaysArrayExists(l),I.ensureKeyExists("declaration",l),I.ensureKeyExists("instruction",l),I.ensureKeyExists("attributes",l),I.ensureKeyExists("text",l),I.ensureKeyExists("comment",l),I.ensureKeyExists("cdata",l),I.ensureKeyExists("doctype",l),I.ensureKeyExists("type",l),I.ensureKeyExists("name",l),I.ensureKeyExists("elements",l),I.ensureKeyExists("parent",l),I.checkFnExists("doctype",l),I.checkFnExists("instruction",l),I.checkFnExists("cdata",l),I.checkFnExists("comment",l),I.checkFnExists("text",l),I.checkFnExists("instructionName",l),I.checkFnExists("elementName",l),I.checkFnExists("attributeName",l),I.checkFnExists("attributeValue",l),I.checkFnExists("attributes",l),l}function it(t){var e=Number(t);if(!isNaN(e))return e;var o=t.toLowerCase();return o==="true"?!0:o==="false"?!1:t}function Se(t,e){var o;if(l.compact){if(!w[l[t+"Key"]]&&(ve(l.alwaysArray)?l.alwaysArray.indexOf(l[t+"Key"])!==-1:l.alwaysArray)&&(w[l[t+"Key"]]=[]),w[l[t+"Key"]]&&!ve(w[l[t+"Key"]])&&(w[l[t+"Key"]]=[w[l[t+"Key"]]]),t+"Fn"in l&&typeof e=="string"&&(e=l[t+"Fn"](e,w)),t==="instruction"&&("instructionFn"in l||"instructionNameFn"in l)){for(o in e)if(e.hasOwnProperty(o))if("instructionFn"in l)e[o]=l.instructionFn(e[o],o,w);else{var s=e[o];delete e[o],e[l.instructionNameFn(o,s,w)]=s}}ve(w[l[t+"Key"]])?w[l[t+"Key"]].push(e):w[l[t+"Key"]]=e}else{w[l.elementsKey]||(w[l.elementsKey]=[]);var d={};if(d[l.typeKey]=t,t==="instruction"){for(o in e)if(e.hasOwnProperty(o))break;d[l.nameKey]="instructionNameFn"in l?l.instructionNameFn(o,e,w):o,l.instructionHasAttributes?(d[l.attributesKey]=e[o][l.attributesKey],"instructionFn"in l&&(d[l.attributesKey]=l.instructionFn(d[l.attributesKey],o,w))):("instructionFn"in l&&(e[o]=l.instructionFn(e[o],o,w)),d[l.instructionKey]=e[o])}else t+"Fn"in l&&(e=l[t+"Fn"](e,w)),d[l[t+"Key"]]=e;l.addParent&&(d[l.parentKey]=w),w[l.elementsKey].push(d)}}function ot(t){if("attributesFn"in l&&t&&(t=l.attributesFn(t,w)),(l.trim||"attributeValueFn"in l||"attributeNameFn"in l||l.nativeTypeAttributes)&&t){var e;for(e in t)if(t.hasOwnProperty(e)&&(l.trim&&(t[e]=t[e].trim()),l.nativeTypeAttributes&&(t[e]=it(t[e])),"attributeValueFn"in l&&(t[e]=l.attributeValueFn(t[e],e,w)),"attributeNameFn"in l)){var o=t[e];delete t[e],t[l.attributeNameFn(e,t[e],w)]=o}}return t}function $t(t){var e={};if(t.body&&(t.name.toLowerCase()==="xml"||l.instructionHasAttributes)){for(var o=/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|(\w+))\s*/g,s;(s=o.exec(t.body))!==null;)e[s[1]]=s[2]||s[3]||s[4];e=ot(e)}if(t.name.toLowerCase()==="xml"){if(l.ignoreDeclaration)return;w[l.declarationKey]={},Object.keys(e).length&&(w[l.declarationKey][l.attributesKey]=e),l.addParent&&(w[l.declarationKey][l.parentKey]=w)}else{if(l.ignoreInstruction)return;l.trim&&(t.body=t.body.trim());var d={};l.instructionHasAttributes&&Object.keys(e).length?(d[t.name]={},d[t.name][l.attributesKey]=e):d[t.name]=t.body,Se("instruction",d)}}function nt(t,e){var o;if(typeof t=="object"&&(e=t.attributes,t=t.name),e=ot(e),"elementNameFn"in l&&(t=l.elementNameFn(t,w)),l.compact){if(o={},!l.ignoreAttributes&&e&&Object.keys(e).length){o[l.attributesKey]={};var s;for(s in e)e.hasOwnProperty(s)&&(o[l.attributesKey][s]=e[s])}!(t in w)&&(ve(l.alwaysArray)?l.alwaysArray.indexOf(t)!==-1:l.alwaysArray)&&(w[t]=[]),w[t]&&!ve(w[t])&&(w[t]=[w[t]]),ve(w[t])?w[t].push(o):w[t]=o}else w[l.elementsKey]||(w[l.elementsKey]=[]),o={},o[l.typeKey]="element",o[l.nameKey]=t,!l.ignoreAttributes&&e&&Object.keys(e).length&&(o[l.attributesKey]=e),l.alwaysChildren&&(o[l.elementsKey]=[]),w[l.elementsKey].push(o);o[l.parentKey]=w,w=o}function rt(t){l.ignoreText||!t.trim()&&!l.captureSpacesBetweenElements||(l.trim&&(t=t.trim()),l.nativeType&&(t=it(t)),l.sanitize&&(t=t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")),Se("text",t))}function st(t){l.ignoreComment||(l.trim&&(t=t.trim()),Se("comment",t))}function dt(t){var e=w[l.parentKey];l.addParent||delete w[l.parentKey],w=e}function Ht(t){l.ignoreCdata||(l.trim&&(t=t.trim()),Se("cdata",t))}function Yt(t){l.ignoreDoctype||(t=t.replace(/^ /,""),l.trim&&(t=t.trim()),Se("doctype",t))}function lt(t){t.note=t}ht.exports=function(t,e){var o=Oe?Wt.parser(!0,{}):o=new zt.Parser("UTF-8"),s={};if(w=s,l=Kt(e),Oe?(o.opt={strictEntities:!0},o.onopentag=nt,o.ontext=rt,o.oncomment=st,o.onclosetag=dt,o.onerror=lt,o.oncdata=Ht,o.ondoctype=Yt,o.onprocessinginstruction=$t):(o.on("startElement",nt),o.on("text",rt),o.on("comment",st),o.on("endElement",dt),o.on("error",lt)),Oe)o.write(t).close();else if(!o.parse(t))throw new Error("XML parsing error: "+o.getError());if(s[l.elementsKey]){var d=s[l.elementsKey];delete s[l.elementsKey],s[l.elementsKey]=d,delete s.text}return s}});var pt=be((ga,ct)=>{var mt=ke(),Zt=je();function Jt(t){var e=mt.copyOptions(t);return mt.ensureSpacesExists(e),e}ct.exports=function(t,e){var o,s,d,m;return o=Jt(e),s=Zt(t,o),m="compact"in o&&o.compact?"_parent":"parent","addParent"in o&&o.addParent?d=JSON.stringify(s,function(u,v){return u===m?"_":v},o.spaces):d=JSON.stringify(s,null,o.spaces),d.replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029")}});var Ge=be((Da,Tt)=>{var F=ke(),Xt=Fe().isArray,H,Y;function ea(t){var e=F.copyOptions(t);return F.ensureFlagExists("ignoreDeclaration",e),F.ensureFlagExists("ignoreInstruction",e),F.ensureFlagExists("ignoreAttributes",e),F.ensureFlagExists("ignoreText",e),F.ensureFlagExists("ignoreComment",e),F.ensureFlagExists("ignoreCdata",e),F.ensureFlagExists("ignoreDoctype",e),F.ensureFlagExists("compact",e),F.ensureFlagExists("indentText",e),F.ensureFlagExists("indentCdata",e),F.ensureFlagExists("indentAttributes",e),F.ensureFlagExists("indentInstruction",e),F.ensureFlagExists("fullTagEmptyElement",e),F.ensureFlagExists("noQuotesForNativeAttributes",e),F.ensureSpacesExists(e),typeof e.spaces=="number"&&(e.spaces=Array(e.spaces+1).join(" ")),F.ensureKeyExists("declaration",e),F.ensureKeyExists("instruction",e),F.ensureKeyExists("attributes",e),F.ensureKeyExists("text",e),F.ensureKeyExists("comment",e),F.ensureKeyExists("cdata",e),F.ensureKeyExists("doctype",e),F.ensureKeyExists("type",e),F.ensureKeyExists("name",e),F.ensureKeyExists("elements",e),F.checkFnExists("doctype",e),F.checkFnExists("instruction",e),F.checkFnExists("cdata",e),F.checkFnExists("comment",e),F.checkFnExists("text",e),F.checkFnExists("instructionName",e),F.checkFnExists("elementName",e),F.checkFnExists("attributeName",e),F.checkFnExists("attributeValue",e),F.checkFnExists("attributes",e),F.checkFnExists("fullTagEmptyElement",e),e}function he(t,e,o){return(!o&&t.spaces?`
`:"")+Array(e+1).join(t.spaces)}function Ce(t,e,o){if(e.ignoreAttributes)return"";"attributesFn"in e&&(t=e.attributesFn(t,Y,H));var s,d,m,u,v=[];for(s in t)t.hasOwnProperty(s)&&t[s]!==null&&t[s]!==void 0&&(u=e.noQuotesForNativeAttributes&&typeof t[s]!="string"?"":'"',d=""+t[s],d=d.replace(/"/g,"&quot;"),m="attributeNameFn"in e?e.attributeNameFn(s,d,Y,H):s,v.push(e.spaces&&e.indentAttributes?he(e,o+1,!1):" "),v.push(m+"="+u+("attributeValueFn"in e?e.attributeValueFn(d,s,Y,H):d)+u));return t&&Object.keys(t).length&&e.spaces&&e.indentAttributes&&v.push(he(e,o,!1)),v.join("")}function ut(t,e,o){return H=t,Y="xml",e.ignoreDeclaration?"":"<?xml"+Ce(t[e.attributesKey],e,o)+"?>"}function ft(t,e,o){if(e.ignoreInstruction)return"";var s;for(s in t)if(t.hasOwnProperty(s))break;var d="instructionNameFn"in e?e.instructionNameFn(s,t[s],Y,H):s;if(typeof t[s]=="object")return H=t,Y=d,"<?"+d+Ce(t[s][e.attributesKey],e,o)+"?>";var m=t[s]?t[s]:"";return"instructionFn"in e&&(m=e.instructionFn(m,s,Y,H)),"<?"+d+(m?" "+m:"")+"?>"}function bt(t,e){return e.ignoreComment?"":"<!--"+("commentFn"in e?e.commentFn(t,Y,H):t)+"-->"}function yt(t,e){return e.ignoreCdata?"":"<![CDATA["+("cdataFn"in e?e.cdataFn(t,Y,H):t.replace("]]>","]]]]><![CDATA[>"))+"]]>"}function Rt(t,e){return e.ignoreDoctype?"":"<!DOCTYPE "+("doctypeFn"in e?e.doctypeFn(t,Y,H):t)+">"}function Me(t,e){return e.ignoreText?"":(t=""+t,t=t.replace(/&amp;/g,"&"),t=t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),"textFn"in e?e.textFn(t,Y,H):t)}function ta(t,e){var o;if(t.elements&&t.elements.length)for(o=0;o<t.elements.length;++o)switch(t.elements[o][e.typeKey]){case"text":if(e.indentText)return!0;break;case"cdata":if(e.indentCdata)return!0;break;case"instruction":if(e.indentInstruction)return!0;break;case"doctype":case"comment":case"element":return!0;default:return!0}return!1}function aa(t,e,o){H=t,Y=t.name;var s=[],d="elementNameFn"in e?e.elementNameFn(t.name,t):t.name;s.push("<"+d),t[e.attributesKey]&&s.push(Ce(t[e.attributesKey],e,o));var m=t[e.elementsKey]&&t[e.elementsKey].length||t[e.attributesKey]&&t[e.attributesKey]["xml:space"]==="preserve";return m||("fullTagEmptyElementFn"in e?m=e.fullTagEmptyElementFn(t.name,t):m=e.fullTagEmptyElement),m?(s.push(">"),t[e.elementsKey]&&t[e.elementsKey].length&&(s.push(gt(t[e.elementsKey],e,o+1)),H=t,Y=t.name),s.push(e.spaces&&ta(t,e)?`
`+Array(o+1).join(e.spaces):""),s.push("</"+d+">")):s.push("/>"),s.join("")}function gt(t,e,o,s){return t.reduce(function(d,m){var u=he(e,o,s&&!d);switch(m.type){case"element":return d+u+aa(m,e,o);case"comment":return d+u+bt(m[e.commentKey],e);case"doctype":return d+u+Rt(m[e.doctypeKey],e);case"cdata":return d+(e.indentCdata?u:"")+yt(m[e.cdataKey],e);case"text":return d+(e.indentText?u:"")+Me(m[e.textKey],e);case"instruction":var v={};return v[m[e.nameKey]]=m[e.attributesKey]?m:m[e.instructionKey],d+(e.indentInstruction?u:"")+ft(v,e,o)}},"")}function Dt(t,e,o){var s;for(s in t)if(t.hasOwnProperty(s))switch(s){case e.parentKey:case e.attributesKey:break;case e.textKey:if(e.indentText||o)return!0;break;case e.cdataKey:if(e.indentCdata||o)return!0;break;case e.instructionKey:if(e.indentInstruction||o)return!0;break;case e.doctypeKey:case e.commentKey:return!0;default:return!0}return!1}function ia(t,e,o,s,d){H=t,Y=e;var m="elementNameFn"in o?o.elementNameFn(e,t):e;if(typeof t=="undefined"||t===null||t==="")return"fullTagEmptyElementFn"in o&&o.fullTagEmptyElementFn(e,t)||o.fullTagEmptyElement?"<"+m+"></"+m+">":"<"+m+"/>";var u=[];if(e){if(u.push("<"+m),typeof t!="object")return u.push(">"+Me(t,o)+"</"+m+">"),u.join("");t[o.attributesKey]&&u.push(Ce(t[o.attributesKey],o,s));var v=Dt(t,o,!0)||t[o.attributesKey]&&t[o.attributesKey]["xml:space"]==="preserve";if(v||("fullTagEmptyElementFn"in o?v=o.fullTagEmptyElementFn(e,t):v=o.fullTagEmptyElement),v)u.push(">");else return u.push("/>"),u.join("")}return u.push(vt(t,o,s+1,!1)),H=t,Y=e,e&&u.push((d?he(o,s,!1):"")+"</"+m+">"),u.join("")}function vt(t,e,o,s){var d,m,u,v=[];for(m in t)if(t.hasOwnProperty(m))for(u=Xt(t[m])?t[m]:[t[m]],d=0;d<u.length;++d){switch(m){case e.declarationKey:v.push(ut(u[d],e,o));break;case e.instructionKey:v.push((e.indentInstruction?he(e,o,s):"")+ft(u[d],e,o));break;case e.attributesKey:case e.parentKey:break;case e.textKey:v.push((e.indentText?he(e,o,s):"")+Me(u[d],e));break;case e.cdataKey:v.push((e.indentCdata?he(e,o,s):"")+yt(u[d],e));break;case e.doctypeKey:v.push(he(e,o,s)+Rt(u[d],e));break;case e.commentKey:v.push(he(e,o,s)+bt(u[d],e));break;default:v.push(he(e,o,s)+ia(u[d],m,e,o,Dt(u[d],e)))}s=s&&!v.length}return v.join("")}Tt.exports=function(t,e){e=ea(e);var o=[];return H=t,Y="_root_",e.compact?o.push(vt(t,e,0,!0)):(t[e.declarationKey]&&o.push(ut(t[e.declarationKey],e,0)),t[e.elementsKey]&&t[e.elementsKey].length&&o.push(gt(t[e.elementsKey],e,0,!o.length))),o.join("")}});var Nt=be((va,wt)=>{var oa=Ge();wt.exports=function(t,e){t instanceof Buffer&&(t=t.toString());var o=null;if(typeof t=="string")try{o=JSON.parse(t)}catch(s){throw new Error("The JSON structure is invalid")}else o=t;return oa(o,e)}});var St=be((Ta,At)=>{var na=je(),ra=pt(),sa=Ge(),da=Nt();At.exports={xml2js:na,xml2json:ra,js2xml:sa,json2xml:da}});Gt(exports,{activate:()=>pa});var p=le(require("vscode")),ee=le(require("path"));var B=le(require("vscode")),q=le(require("fs")),We=le(require("zlib")),we=le(St());var ye=le(require("path")),j=le(require("vscode"));"use strict";var qe=class{constructor(e){this.type=j.FileType.File,this.ctime=Date.now(),this.mtime=Date.now(),this.size=0,this.name=e}},Te=class{constructor(e){this.type=j.FileType.Directory,this.ctime=Date.now(),this.mtime=Date.now(),this.size=0,this.name=e,this.entries=new Map}},Qe=class{constructor(){this.root=new Te("");this._emitter=new j.EventEmitter;this._bufferedEvents=[];this.onDidChangeFile=this._emitter.event}stat(e){return this._lookup(e,!1)}readDirectory(e){let o=this._lookupAsDirectory(e,!1),s=[];for(let[d,m]of o.entries)s.push([d,m.type]);return s}readFile(e){let o=this._lookupAsFile(e,!1).data;if(o)return o;throw j.FileSystemError.FileNotFound()}writeFile(e,o,s){let d=ye.posix.basename(e.path),m=this._lookupParentDirectory(e),u=m.entries.get(d);if(u instanceof Te)throw j.FileSystemError.FileIsADirectory(e);if(!u&&!s.create)throw j.FileSystemError.FileNotFound(e);if(u&&s.create&&!s.overwrite)throw j.FileSystemError.FileExists(e);u||(u=new qe(d),m.entries.set(d,u),this._fireSoon({type:j.FileChangeType.Created,uri:e})),u.mtime=Date.now(),u.size=o.byteLength,u.data=o,this._fireSoon({type:j.FileChangeType.Changed,uri:e})}rename(e,o,s){if(!s.overwrite&&this._lookup(o,!0))throw j.FileSystemError.FileExists(o);let d=this._lookup(e,!1),m=this._lookupParentDirectory(e),u=this._lookupParentDirectory(o),v=ye.posix.basename(o.path);m.entries.delete(d.name),d.name=v,u.entries.set(v,d),this._fireSoon({type:j.FileChangeType.Deleted,uri:e},{type:j.FileChangeType.Created,uri:o})}delete(e){let o=e.with({path:ye.posix.dirname(e.path)}),s=ye.posix.basename(e.path),d=this._lookupAsDirectory(o,!1);if(!d.entries.has(s))throw j.FileSystemError.FileNotFound(e);d.entries.delete(s),d.mtime=Date.now(),d.size-=1,this._fireSoon({type:j.FileChangeType.Changed,uri:o},{uri:e,type:j.FileChangeType.Deleted})}createDirectory(e){let o=ye.posix.basename(e.path),s=e.with({path:ye.posix.dirname(e.path)}),d=this._lookupAsDirectory(s,!1),m=new Te(o);d.entries.set(m.name,m),d.mtime=Date.now(),d.size+=1,this._fireSoon({type:j.FileChangeType.Changed,uri:s},{type:j.FileChangeType.Created,uri:e})}_lookup(e,o){let s=e.path.split("/"),d=this.root;for(let m of s){if(!m)continue;let u;if(d instanceof Te&&(u=d.entries.get(m)),!u){if(o)return;throw j.FileSystemError.FileNotFound(e)}d=u}return d}_lookupAsDirectory(e,o){let s=this._lookup(e,o);if(s instanceof Te)return s;throw j.FileSystemError.FileNotADirectory(e)}_lookupAsFile(e,o){let s=this._lookup(e,o);if(s instanceof qe)return s;throw j.FileSystemError.FileIsADirectory(e)}_lookupParentDirectory(e){let o=e.with({path:ye.posix.dirname(e.path)});return this._lookupAsDirectory(o,!1)}watch(e){return new j.Disposable(()=>{})}_fireSoon(...e){this._bufferedEvents.push(...e),this._fireSoonHandle&&clearTimeout(this._fireSoonHandle),this._fireSoonHandle=setTimeout(()=>{this._emitter.fire(this._bufferedEvents),this._bufferedEvents.length=0},5)}};var De=le(require("path")),It=le(require("child_process")),pe="memfs_composer_file",la=`${pe}:/test.tscm`,Ve=process.env.localappdata+"\\Serena\\Studio\\Repository\\Local\\1",ze=Ve+"\\Serena.Studio.PlugIns.TeamTrack.ObjectModel.TtSolution",Ke=Ve+"\\Serena.Studio.Framework.ObjectModel.JavascriptPart",Le=Ve+"\\Serena.Studio.PlugIns.TeamTrack.ObjectModel.TtScript",Aa=Ve+"\\Serena.Studio.PlugIns.TeamTrack.ObjectModel.TtTable";function ha(t){var e=Number(t);if(!isNaN(e))return e;var o=t.toLowerCase();return o==="true"?!0:o==="false"?!1:t}var _e=function(t,e){try{var o=Object.keys(e._parent).length,s=Object.keys(e._parent)[o-1];e._parent[s]=ha(t)}catch(d){}},Pt=[];xt();function xt(){q.readdirSync(ze).forEach(function(t){let e=Ue(`${ze}\\${t}`);e.name=e.TtSolution.Name;try{e.javascripts=e.TtSolution.JavascriptPartMasterRefs.ModelObjectList.JavascriptPartMasterRef}catch(o){e.javascripts=[]}try{e.sbmscripts=e.TtSolution.ScriptMasterRefs.ModelObjectList.TtScriptMasterRef}catch(o){e.sbmscripts=[]}try{e.tables=e.TtSolution.TableMasterRefs.ModelObjectList.TtTableMasterRef}catch(o){e.tables=[]}e.PartID=e.TtSolution.ID,delete e.TtSolution,delete e.S,delete e.meta,Pt.push(e)})}function Ue(t){let e=0;q.readdirSync(t).forEach(function(O){/^\d+$/.test(O)&&Number(O)>e&&(e=Number(O))});let o;q.existsSync(`${t}\\${e}.#`)?o=q.readFileSync(`${t}\\${e}.#`):o=q.readFileSync(`${t}\\${e}`);let s=We.gunzipSync(o).toString("utf8"),d=JSON.parse(we.xml2json(s,{compact:!0,spaces:4,textFn:_e})),u=q.readFileSync(`${t}\\${e}.meta`).toString(),v=JSON.parse(we.xml2json(u,{compact:!0,spaces:4,textFn:_e}));d.meta=v;let c=q.readFileSync(`${t}\\${e}.S`).toString(),D=JSON.parse(we.xml2json(c,{compact:!0,spaces:4,textFn:_e}));d.S=D;let E;try{E=d.TtScript.UpdatedOn}catch(O){}try{E=d.JavascriptPart.UpdatedOn}catch(O){}return d.mtime=E,d}function Ft(t,e){e===void 0&&(e=0,q.readdirSync(t).forEach(function(m){/^\d+$/.test(m)&&Number(m)>e&&(e=Number(m))}));let s=q.readFileSync(`${t}\\${e}.S`).toString();return JSON.parse(we.xml2json(s,{compact:!0,spaces:4,textFn:_e})).RepositoryStatus.LockState=="LockedByCurrentUser"}var $e=class{constructor(e){this._onDidChangeTreeData=new B.EventEmitter;this.onDidChangeTreeData=this._onDidChangeTreeData.event;this.context=e,B.commands.registerCommand("composerExplorer.openFile",d=>this.openResource(d)),this.memFs=new Qe,this.uri=B.Uri.parse(la),this.editContext={},this.openFiles=[],this.data=[],e.subscriptions.push(B.workspace.registerFileSystemProvider(pe,this.memFs,{isCaseSensitive:!0})),e.subscriptions.push(B.workspace.onDidSaveTextDocument(d=>{if(d.uri.toString().indexOf(pe)!=0)return;let m,u,v;for(let D of this.openFiles)if(D.uri.toString()==d.uri.toString()){m=D.path,v=D.name,u=D.sbmScript;break}let W=B.workspace.getConfiguration("modscript").get("exportFolder");W||(W=De.join(Ct(),"\\SBM Composer\\Imports"));let c=De.join(W,"/",v);q.mkdirSync(De.dirname(c),{recursive:!0}),q.writeFileSync(c,d.getText())}),B.workspace.onDidCloseTextDocument(d=>{if(d.uri.toString().indexOf(pe)==0)try{}catch(m){}})),this.setDataTree();var o=kt(d=>{this.setDataTree()},300,!1),s=kt(d=>{xt(),this.setDataTree()},300,!1);q.watch(Le,{recursive:!0},(d,m)=>{o()}),q.watch(Ke,{recursive:!0},(d,m)=>{o()}),q.watch(ze,{recursive:!0},(d,m)=>{s()})}refresh(){this._onDidChangeTreeData.fire(void 0)}setDataTree(){for(let e of Pt){let o,s=!1;try{this.memFs.createDirectory(B.Uri.parse(`${pe}:/${e.name}/`))}catch(d){}for(let d of this.data)d.id==e.PartID&&(o=d,o.children[0].children=[],o.children[1].children=[]);o||(o=new Ne(e.name,[new Ne("Javascript",[],`${e.PartID}-javascripts-header`),new Ne("Scripts",[],`${e.PartID}-scripts-header`)],e.PartID),s=!0);try{if(e.javascripts)for(let d of e.javascripts){let m=Ft(`${Ke}\\${d.PartID}`);o.children[0].children.push(new Ne(`${d.Name} - ${m?"C":"X"}`,void 0,`${e.name}/${d.PartID}#javascript`,`${m?"Checked out":"Locked"}`))}}catch(d){}try{if(e.sbmscripts)for(let d of e.sbmscripts){let m=Ft(`${Le}\\${d.PartID}`);o.children[1].children.push(new Ne(`${d.Name} - ${m?"C":"X"}`,void 0,`${e.name}/${d.PartID}#script`,`${m?"Checked out":"Locked"}`));let u=Ue(`${Le}\\${d.PartID}`),v=u.TtScript.Content,W=u.TtScript.Name+".tscm";this.memFs.writeFile(B.Uri.parse(`${pe}:/${e.name}/${W}`),Buffer.from(v),{create:!0,overwrite:!0})}}catch(d){}s&&this.data.push(o)}this.refresh()}getTreeItem(e){return e}getChildren(e){return e===void 0?this.data:e.children}openResource(e){let o,s,d,m,u;if(e.includes("#javascript")?(m=`${Ke}\\${e.split("#")[0].split("/")[1]}`,o=Ue(m),s=Buffer.from(o.JavascriptPart.Content),d=e.split("/")[0]+"/"+o.JavascriptPart.Name+".js",u=!1):e.includes("#script")&&(m=`${Le}\\${e.split("#")[0].split("/")[1]}`,o=Ue(m),s=Buffer.from(o.TtScript.Content),o.TtScript.SyntaxType=="ModScript"?d=e.split("/")[0]+"/"+o.TtScript.Name+".tscm":d=e.split("/")[0]+"/"+o.TtScript.Name+".vb",u=!0),this.openFiles.push({uri:B.Uri.parse(`${pe}:/${d}`),PartID:e.split("#")[0],name:d,path:m,sbmScript:u}),o){let v=new Date(o.mtime.replace("#",".")+" GMT"),W=B.workspace.getConfiguration("modscript").get("exportFolder");W||(W=De.join(Ct(),"\\SBM Composer\\Imports"),q.mkdirSync(W,{recursive:!0}));let c=De.join(W,"/",d);q.existsSync(c)&&v<q.statSync(c).mtime&&(s=q.readFileSync(c)),this.memFs.writeFile(B.Uri.parse(`${pe}:/${d}`),s,{create:!0,overwrite:!0}),B.workspace.openTextDocument(B.Uri.parse(`${pe}:/${d}`)).then(D=>{B.window.showTextDocument(D,B.ViewColumn.Active)})}}},Ne=class extends B.TreeItem{constructor(e,o,s,d){super(e,o===void 0?B.TreeItemCollapsibleState.None:B.TreeItemCollapsibleState.Collapsed);this.children=o,this.id=s,this.tooltip=d,this.command={command:"composerExplorer.openFile",title:"Open File",arguments:[this.id]}}};function kt(t,e,o){var s;return function(){var d=this,m=arguments,u=o&&!s;clearTimeout(s),s=setTimeout(function(){s=null,o||t.apply(d,m)},e),u&&t.apply(d,m)}}var He;function Ct(){if(!He){let t=(0,It.execSync)('powershell.exe -command "reg query \\"HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\User Shell Folders\\" /v Personal"').toString().split("REG_EXPAND_SZ")[1].trim();t=ma(t),He=t}return He}function ma(t){return t.replace(/%([^%]+)%/g,function(e,o){return process.env[o]})}var Vt={ADLog:{className:"ADLog",exposed:!0,inheritsFrom:"",classDescription:"A class for logging to Active Diagnostics.",meathods:[{meathodName:"Message",meathodDescription:"Writes a message to Active Diagnostics",meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"level",type:"int",description:`Corresponds to values from ADLogLevelConstants [page
342].`,optional:!1},{name:"value",type:"string",description:"Value will be converted to a string and written to the log.",optional:!1}]}],properties:[]},AppDb:{className:"AppDb",exposed:!1,inheritsFrom:"",classDescription:"A class for logging to Active Diagnostics.",meathods:[{meathodName:"ColName",meathodDescription:`Converts the parameter to the form of a valid database column name, using the same
transformation applied when you enter logical field names in SBM Composer.`,meathodReturn:"string",meathodReturnDescription:`A column name in legal database form, containing only upper case
letters and underscores, prefixed with "TS_".`,meathodParms:[{name:"colname",type:"string",description:`Base name of field or column (without "TS_"). Can contain
spaces, punctuation, and mixed case.`,optional:!1}]},{meathodName:"ExecuteSQL",meathodDescription:"Executes SQL in the database. See important notes below.",meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"sqlText",type:"string",description:"The SQL to pass in.",optional:!1},{name:"params",type:"Vector",description:`An optional Vector storing SQL bind parameters, where each
entry is a Pair, with the first value as the parameter type
and the second value as the value to bind to the SQL
parameter. Corresponds to DBTypeConstants [page 347].
See Pair, Map_Pair, and Dictionary_Pair [page 123].`,optional:!0}]},{meathodName:"GetConnectionInfo",meathodDescription:`Provides information on the data source name, the name of the
database, the name or IP address of the server that contains the database currently
connected to SBM, and whether the connection is remote.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the method was successful; false if not.",meathodParms:[{name:"dsn",type:"string",description:`(Output) The data source name from ODBC that the
connection is using to access the database.`,optional:!1},{name:"dbname",type:"string",description:`(Output) The full database name that the connection is
accessing.`,optional:!1},{name:"srvname",type:"string",description:`(Output) The server name that the connection is using to
access the DBMS. This could be a machine name or an IP
address.`,optional:!1},{name:"remote",type:"bool",description:"(Output) Always false.",optional:!1}]},{meathodName:"ReadFolderItems",meathodDescription:"Provides a list of items in a folder.",meathodReturn:"bool",meathodReturnDescription:`Returns true if the method was successful; false if not. A successful
read may return zero results if no items match the query. Check for
results by calling the AppRecordList.empty() method.`,meathodParms:[{name:"list",type:"FolderItemList",description:"(Output) The list of items in the folder.",optional:!1},{name:"folderId",type:"int",description:"The parent folder of the items you wish to access.",optional:!1}]},{meathodName:"GetDbType",meathodDescription:"Returns the database connection type.",meathodReturn:"int",meathodReturnDescription:`Oracle: 1
\u2022 SQL Server: 2
\u2022 Import Source DB possible values:
\u25AA Access: 3
\u25AA Sybase: 4
\u25AA DB2: 5`,meathodParms:[]},{meathodName:"IsMSSQL",meathodDescription:"Returns true if database connection is SQL Server",meathodReturn:"bool",meathodReturnDescription:"Returns true if database connection is SQL Server.",meathodParms:[]},{meathodName:"IsOracle",meathodDescription:"Returns true if database connection is Oracle.",meathodReturn:"bool",meathodReturnDescription:"Returns true if database connection is Oracle.",meathodParms:[]},{meathodName:"ReadIntWithSQL",meathodDescription:"Reads any single integer out of the database.",meathodReturn:"int",meathodReturnDescription:"The int value from the database.",meathodParms:[{name:"sqlText",type:"string",description:"The SQL to pass in.",optional:!1},{name:"params",type:"Vector",description:`An optional Vector storing SQL bind parameters, where each
entry is a Pair, with the first value as the parameter type
and the second value as the value to bind to the SQL
parameter. Corresponds to DBTypeConstants [page 347].
See Pair, Map_Pair, and Dictionary_Pair [page 123].`,optional:!0}]},{meathodName:"ReadTextWithSQL",meathodDescription:`Reads any single varchar value, up to 256 characters, out of
the database.`,meathodReturn:"string",meathodReturnDescription:"The value that was read from the database.",meathodParms:[{name:"sqlText",type:"string",description:"The SQL to pass in.",optional:!1},{name:"params",type:"Vector",description:`An optional Vector storing SQL bind parameters, where each
entry is a Pair, with the first value as the parameter type
and the second value as the value to bind to the SQL
parameter. Corresponds to DBTypeConstants [page 347].
See Pair, Map_Pair, and Dictionary_Pair [page 123].`,optional:!0}]},{meathodName:"ReadIntegersWithSQL",meathodDescription:`Reads any single varchar value, up to 256 characters, out of
the database.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if successful; false otherwise. A successful read may
return zero results if no items match the query. Check for results by
calling the Vector.empty() method.`,meathodParms:[{name:"sqlText",type:"string",description:"The SQL to pass in.",optional:!1},{name:"out",type:"Vector",description:`The results of the query. Each entry in the Vector will be an
int.`,optional:!1},{name:"params",type:"Vector",description:`An optional Vector storing SQL bind parameters, where each
entry is a Pair, with the first value as the parameter type
and the second value as the value to bind to the SQL
parameter. Corresponds to DBTypeConstants [page 347].
See Pair, Map_Pair, and Dictionary_Pair [page 123].`,optional:!0}]},{meathodName:"ReadTextValsWithSQL",meathodDescription:`Reads multiple rows of a single text column from the
database, filling the Vector "out".`,meathodReturn:"bool",meathodReturnDescription:`Returns true if successful; false otherwise. A successful read may
return zero results if no items match the query. Check for results by
calling the Vector.empty() method.`,meathodParms:[{name:"sqlText",type:"string",description:"The SQL to pass in.",optional:!1},{name:"out",type:"Vector",description:`The results of the query. Each entry in the Vector will be an
int.`,optional:!1},{name:"params",type:"Vector",description:`An optional Vector storing SQL bind parameters, where each
entry is a Pair, with the first value as the parameter type
and the second value as the value to bind to the SQL
parameter. Corresponds to DBTypeConstants [page 347].
See Pair, Map_Pair, and Dictionary_Pair [page 123].`,optional:!0}]},{meathodName:"ReadIntegerPairsWithSQL",meathodDescription:`Reads multiple rows of two integer columns from the
database, filling the Vector "out" with Pair<int,int> values.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if successful; false otherwise. A successful read may
return zero results if no items match the query. Check for results by
calling the Vector.empty() method.`,meathodParms:[{name:"sqlText",type:"string",description:"The SQL to pass in.",optional:!1},{name:"out",type:"Vector",description:`The results of the query. Each entry in the Vector will be a
Pair of int values. See Pair, Map_Pair, and Dictionary_Pair
[page 123].`,optional:!1},{name:"params",type:"Vector",description:`An optional Vector storing SQL bind parameters, where each
entry is a Pair, with the first value as the parameter type
and the second value as the value to bind to the SQL
parameter. Corresponds to DBTypeConstants [page 347].
See Pair, Map_Pair, and Dictionary_Pair [page 123].`,optional:!0}]},{meathodName:"ReadDynaSQL",meathodDescription:`Reads multiple rows of a set of columns from the database,
filling the Vector "out".`,meathodReturn:"bool",meathodReturnDescription:`Returns true if successful; false otherwise. A successful read may
return zero results if no items match the query. Check for results by
calling the Vector.empty() method.`,meathodParms:[{name:"sqlText",type:"string",description:"The SQL to invoke.",optional:!1},{name:"sqlColumns",type:"Vector",description:`A Vector storing SQL output column definitions, where each
entry is a SQLColumnDef [page 281].`,optional:!1},{name:"out",type:"Vector",description:`The results of the query. Each entry in the Vector will be a
Vector; each entry in that Vector is specified by the type
from the corresponding entry in sqlColumns.
For instance, if sqlColumns has a DBConstants.INTEGER
and a DBConstants.VARCHAR, each entry in the out Vector
will be a Vector that contains an int and a string.`,optional:!1},{name:"params",type:"Vector",description:`An optional Vector storing SQL bind parameters, where each
entry is a Pair, with the first value as the parameter type
and the second value as the value to bind to the SQL
parameter. Corresponds to DBTypeConstants [page 347].
See Pair, Map_Pair, and Dictionary_Pair [page 123].`,optional:!0}]},{meathodName:"WriteBlobToFile",meathodDescription:"Get the contents of a blob written to the file system.",meathodReturn:"bool",meathodReturnDescription:"Returns true if successful; false otherwise",meathodParms:[{name:"blobID",type:"int",description:"The TS_ID of the blob from the TS_BLOBS table.",optional:!1},{name:"filepath",type:"string",description:"The full file name and path to write the file to.",optional:!1}]},{meathodName:"UpdateBlobFromFile",meathodDescription:"Put a file's contents into a blob.",meathodReturn:"bool",meathodReturnDescription:"Returns true if successful; false otherwise.",meathodParms:[{name:"blobID",type:"int",description:"The TS_ID of the blob from the TS_BLOBS table.",optional:!1},{name:"filepath",type:"string",description:"The full file name and path to write the file to.",optional:!1}]},{meathodName:"UserId",meathodDescription:"Gets the current user's TS_ ID.",meathodReturn:"int",meathodReturnDescription:"The TS_ID of the current user from the TS_USERS table.",meathodParms:[]}],properties:[]},AppRecord:{className:"AppRecord",exposed:!1,inheritsFrom:"",classDescription:`AppRecord is the base object type for the majority of SBM objects. An AppRecord can
represent any row of any table from the current SBM database. The table is specified by a
numeric table ID which must be supplied when the AppRecord is created. Thus,
AppRecord objects must be created using Ext.CreateAppRecord() and cannot be created
with CreateObject(). For details on Ext.CreateAppRecord, refer to Ext.CreateAppRecord(
tableId [, recType] ) [page 47]. For details on working with SBM database records, refer
to Working with SBM Database Records [page 23].`,meathods:[{meathodName:"Add",meathodDescription:`This method adds a new row to a table. After creating an AppRecord from
the desired table and setting any desired field values, use this method to add the
record as a new row in its table. This is not for use with Primary tables, because
those items must go through a Submit transition. However, it is possible to make a
copy of a Primary table item using this method.`,meathodReturn:"int",meathodReturnDescription:`The TS_ID of the record added, which is unique to this table.
Zero means the record could not be added due to an error.`,meathodParms:[]},{meathodName:"Delete",meathodDescription:`On most tables, this method removes the record from the database. On
tables such as States and Users, the records are marked as deleted but remain in
the database.`,meathodReturn:"bool",meathodReturnDescription:`True if the record is deleted from or marked as deleted in the
database.`,meathodParms:[]},{meathodName:"Fields",meathodDescription:"Returns a VarFieldList containing all fields for a VarRecord.",meathodReturn:"VarFieldList",meathodReturnDescription:`The list of fields from this AppRecord. If there is no FieldList for this
record, this method returns null. Use is_var_null() to check for
null.`,meathodParms:[]},{meathodName:"GetDisplayName",meathodDescription:"Returns the display name of a record.",meathodReturn:"string",meathodReturnDescription:"This record's display name, formatted according to table settings.",meathodParms:[]},{meathodName:"GetFieldValue",meathodDescription:"Gets the value of any field.",meathodReturn:"Variant",meathodReturnDescription:`The internal value for a field or column.
For Text fields, this is the exact value entered in the field;
for selection fields, the value is the database ID for the
selection. For values that are not Variant or TimeT, this
internally gets the value from the field as a Variant, and
then tries to convert the value to the requested type.
TimeT can be used with Date/Time fields to get the
internal date value.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueString",meathodDescription:"Gets the value of a field in the calling record's variable field list.",meathodReturn:"string",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueInt",meathodDescription:"Gets the value of a field in the calling record's variable field list.",meathodReturn:"int",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueInt64",meathodDescription:"Gets the value of a field in the calling record's variable field list.",meathodReturn:"int64_t",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueDouble",meathodDescription:"Gets the value of a field in the calling record's variable field list.",meathodReturn:"double",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueTimeT",meathodDescription:"Gets the value of a field in the calling record's variable field list.",meathodReturn:"TimeT",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetId",meathodDescription:"Retrieves the current AppRecord's TS_ID.",meathodReturn:"int",meathodReturnDescription:"TS_ID of the calling AppRecord.",meathodParms:[]},{meathodName:"GetUUID",meathodDescription:"Returns the item's UUID, if applicable.",meathodReturn:"string",meathodReturnDescription:"The item's UUID.",meathodParms:[]},{meathodName:"GetName",meathodDescription:`Gets the calling AppRecord's "Name" system field.`,meathodReturn:"string",meathodReturnDescription:"A text string from the associated Name field.",meathodParms:[]},{meathodName:"GetRecTableId",meathodDescription:"Returns the calling AppRecord's table ID.",meathodReturn:"int",meathodReturnDescription:"The calling AppRecord's table ID.",meathodParms:[]},{meathodName:"GetSchemaColumns",meathodDescription:`Returns a Vector of SchemaColumn objects. Will not include fields for VarRecord or
ProjectBasedRecord objects.`,meathodReturn:"Vector",meathodReturnDescription:`Each entry will be a SchemaColumn object representing a column in
the database that this item can interact with.`,meathodParms:[]},{meathodName:"HasVariableDBFields",meathodDescription:"Tests whether the calling AppRecord is from a table with variable fields.",meathodReturn:"bool",meathodReturnDescription:"Returns true if the calling AppRecord's table has variable fields.",meathodParms:[]},{meathodName:"IsFieldEqual",meathodDescription:"Tests for equivalence between the specified field and a value formatted as a string.",meathodReturn:"bool",meathodReturnDescription:"Returns true if the field is found and is equal; false otherwise.",meathodParms:[{name:"fieldNameOrId",type:["int","string"],description:`If a non-numeric string, the name of the field to be tested.
Otherwise, it is converted to a number and taken as the
TS_ID of the field to be tested.`,optional:!1},{name:"value",type:"string",description:`The value to be compared to. The field's value will be
formatted as a string and compared to this value.`,optional:!1}]},{meathodName:"IsLocked",meathodDescription:`Tests whether the calling AppRecord has been locked, meaning it is in use by another
user.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record is locked by another user.",meathodParms:[{name:"lockedByThisUser",type:"bool",description:`Without an input parameter ( or with "false" as the input ),
IsLocked() means "Does someone else have this record
locked?"
With "true" as the input parameter, the meaning is "May I
(as the current user) update this record?"`,optional:!0}]},{meathodName:"Lock",meathodDescription:`Locks the calling AppRecord, so other users will not attempt
to update it.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record is locked by another user.",meathodParms:[{name:"stealLock",type:"bool",description:`Defaults to false, meaning if this item is already
locked, no lock will be established.
If true, any existing lock on this record will be broken, and
changes made by the former lock holder are lost.`,optional:!0}]},{meathodName:"Read",meathodDescription:"Looks up a row in the AppRecord's table",meathodReturn:"bool",meathodReturnDescription:`Returns true if the TS_ID or name was found, in which case the
calling AppRecord object becomes a copy of that row in the table.`,meathodParms:[{name:"recordIdOrName",type:["int","string"],description:`If this is an int or string that SBM ModScript can convert to
an int, it is taken as the value to search for in the TS_ID
column. All other parameter types are converted to a string
and searched for in the Name system field.`,optional:!1}]},{meathodName:"ReadWithWhere",meathodDescription:`Used to find a record by passing in a string containing a SQL
"where" clause, not including the keyword "where".`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the method found the record, in which case the calling
object becomes a copy of the record found. If more than one record
is found, the first one is copied to the calling object.`,meathodParms:[{name:"whereClause",type:"string",description:`The SQL "where" clause to find the specific record in the
table, not including the keyword "where".`,optional:!1},{name:"queryParams",type:"Vector",description:`queryParams is an optional Vector storing SQL bind
parameters, where each entry is a Pair, where the first value
is the parameter type and the second value is the value to
bind to the SQL parameter. See Pair, Map_Pair, and
Dictionary_Pair [page 123].
For the type parameter, use DBTypeConstants [page 347].`,optional:!0}]},{meathodName:"ReadByColumn",meathodDescription:"Reads any record type by a column value",meathodReturn:"bool",meathodReturnDescription:`Returns true if the item is read successfully; false if the item is not
found.`,meathodParms:[{name:"columnName",type:"string",description:"The database name of the column without the TS_ prefix.",optional:!1},{name:"value",type:"Variant",description:`Behavior depends on the Variant internal type:
\u2022 string \u2013 ReadByColumn() will succeed if the column is a
text column.
\u2022 int, int64_t, short, byte, or bool \u2013 ReadByColumn() will
succeed if the column is an integer column.
\u2022 float or double \u2013 ReadByColumn() will succeed if the
column is a floating point column.`,optional:!1}]},{meathodName:"ReadByColumnAndColumn",meathodDescription:"Reads any record type by two column values",meathodReturn:"bool",meathodReturnDescription:`Returns true if the item is read successfully; false if the item is not
found.`,meathodParms:[{name:"columnName",type:"string",description:'The name of the column without the "TS_" prefix',optional:!1},{name:"value",type:"Variant",description:`Value must be an int, int64_t, short, byte, bool, or string
that can be converted to an int.`,optional:!1},{name:"column2Name",type:"string",description:'The name of the second column without the "TS_" prefix.',optional:!1},{name:"value2",type:"Variant",description:`Behavior depends on the Variant internal type:
\u2022 string \u2013 ReadByColumn() will succeed if the column is a
text column.
\u2022 int, int64_t, short, byte, or bool \u2013 ReadByColumn() will
succeed if the column is an integer column.
\u2022 float or double \u2013 Not supported.`,optional:!1}]},{meathodName:"ReadByUUID",meathodDescription:"Reads the item using the UUID column, if it exists.",meathodReturn:"bool",meathodReturnDescription:`Returns true if the record was found, in which case the
calling AppRecord object becomes a copy of that row in the table.`,meathodParms:[{name:"itemUUID",type:"string",description:"The UUID value that is passed in.",optional:!1}]},{meathodName:"SetFieldValue",meathodDescription:"Sets the value of any column.",meathodReturn:"bool",meathodReturnDescription:`Returns true if the column value was successfully set; false
otherwise.`,meathodParms:[{name:"name",type:"string",description:`The name of the column whose value will be set in the
AppRecord schema.`,optional:!1},{name:"value",type:["int","string","int64_t","double","TimeT","Variant"],description:`The new value for the column. The value
must be specified as it is stored in the database. For
example, for integer columns that are a foreign key to the
TS_USERS table, the value must be the database ID for
the user. TimeT values should only be used with columns
that represent dates, either as a native database date or
as a integer that represents dates in Unix Epoch time
format.`,optional:!1}]},{meathodName:"SetName",meathodDescription:'Sets the "name" value of the calling object.',meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"newName",type:"string",description:"Text to be used as the new name for the item.",optional:!1}]},{meathodName:"Unlock",meathodDescription:`Unlocks the calling AppRecord, signaling that it is available
for other users.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the record was successfully unlocked or was not
locked to begin with.`,meathodParms:[{name:"currentUserOnly",type:"bool",description:`Defaults to false. If true, only the current user's
lock is unlocked. If false, any user's lock on this record is
removed.`,optional:!0}]},{meathodName:"Update",meathodDescription:`This method updates the item in the database using the
values from the item.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record is updated in the database.",meathodParms:[]},{meathodName:"UpdateWithLock",meathodDescription:`Updates the record that has been previously locked with
Lock() function.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record was successfully updated; false otherwise.",meathodParms:[{name:"stealLock",type:"bool",description:`Optional parameter that allows the user to skip the Lock()
function and steal the lock during the update. Defaults to
false. If true, any other user's existing lock will be broken,
causing that user's changes to be lost.`,optional:!0}]}],properties:[]},AppRecordList:{className:"AppRecordList",exposed:!1,inheritsFrom:"",classDescription:`An AppRecordList contains a list of AppRecords of any subtype. The AppRecord objects on
a single AppRecordList need not be from the same table or of the same AppRecord
subtype, though homogeneous lists are easier to work with.
AppRecordList, and all child classes, can be iterated using ChaiScript's for loop. See
example in ReadWithWhere() [page 193].`,meathods:[{meathodName:"Count",meathodDescription:"Returns the number of items in the list.",meathodReturn:"int",meathodReturnDescription:"The number of items in the list.",meathodParms:[]},{meathodName:"DeleteRecord",meathodDescription:"Removes the specified record from the list.",meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"recordId",type:"int",description:"The TS_ID of the record to delete from the list.",optional:!1}]},{meathodName:"FindRecord",meathodDescription:"Find a specific record in the current list by matching its name or TS_ID.",meathodReturn:"AppRecord",meathodReturnDescription:`The first AppRecord in the list that matches the given name or ID. If
there is no match, returns null. Use is_var_null() to check for null.`,meathodParms:[{name:"recordIdOrName",type:"Variant",description:`If this parameter is a non-numeric string, it is taken as
the desired record's name. Otherwise, it is converted to
an integer and taken as the desired record's TS_ID.`,optional:!1}]},{meathodName:"Length",meathodDescription:"Returns the number of items in the list.",meathodReturn:"int",meathodReturnDescription:"The number of items in the list.",meathodParms:[]},{meathodName:"Read",meathodDescription:"Fills the AppRecordList from its table.",meathodReturn:"bool",meathodReturnDescription:`Returns true if successful; false otherwise. A successful read may
return zero results if no items match the query. Check for results by
calling the AppRecordList.empty() method.`,meathodParms:[]},{meathodName:"ReadByColumn",meathodDescription:"Reads any record list type by a column value",meathodReturn:"bool",meathodReturnDescription:`Returns true if successful; false otherwise. A successful read may
return zero results if no items match the query. Check for results by
calling the AppRecordList.empty() method.`,meathodParms:[{name:"columnName",type:"string",description:'The name of the column without the "TS_" prefix.',optional:!1},{name:"value",type:"Variant",description:`Behavior depends on the Variant internal type:
\u2022 string \u2013 ReadByColumn() will succeed if the column is a
text column.
\u2022 int, int64_t, short, byte, or bool \u2013 ReadByColumn() will
succeed if the column is an integer column.
\u2022 float or double \u2013 ReadByColumn() will succeed if the
column is a floating point column.`,optional:!1}]},{meathodName:"ReadByColumnAndColumn",meathodDescription:"Reads any record list type by two column values.",meathodReturn:"bool",meathodReturnDescription:`Returns true if successful; false otherwise. A successful read may
return zero results if no items match the query. Check for results by
calling the AppRecordList.empty() method.`,meathodParms:[{name:"columnName",type:"string",description:'The name of the column without the "TS_" prefix',optional:!1},{name:"value",type:"Variant",description:`Value must be an int, int64_t, short, byte, bool, or string
that can be converted to an int.`,optional:!1},{name:"column2Name",type:"string",description:'The name of the second column without the "TS_" prefix.',optional:!1},{name:"value2",type:"Variant",description:`Behavior depends on the Variant internal type:
\u2022 string \u2013 ReadByColumn() will succeed if the column is a
text column.
\u2022 int, int64_t, short, byte, or bool \u2013 ReadByColumn() will
succeed if the column is an integer column.
\u2022 float or double \u2013 Not supported.`,optional:!1}]},{meathodName:"ReadWithWhere",meathodDescription:`An alternative to Read(), this method uses SQL to select
only certain records from the calling AppRecordList's table, rather than reading the entire
table.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if successful; false otherwise. A successful read may
return zero results if no items match the query. Check for results by
calling the AppRecordList.empty() method.`,meathodParms:[{name:"whereClause",type:"string",description:`A SQL "where clause" specifying the records to find. SBM
will build a SQL string requesting all fields for the calling
AppRecordList's table. The string contents of
whereClause will appear after the word "where" in this
SQL statement.`,optional:!1},{name:"params",type:"Vector",description:`Params is an optional Vector storing SQL bind
parameters, where each entry is a Pair, with the first
value as the parameter type and the second value as the
value to bind to the SQL parameter. See Pair, Map_Pair,
and Dictionary_Pair [page 123].
For the type parameter, use DBTypeConstants [page
347].`,optional:!0},{name:"orderBy",type:"string",description:`Identifies a column used for ordering the AppRecordList.
To use the templateRec parameter without the orderBy
parameter, use an empty string as a parameter for the
orderBy parameter.`,optional:!0},{name:"templateRec",type:"AppRecord",description:`Optional. Identifies which fields are read into all
AppRecords in the AppRecordList. Using this parameter
may improve performance when using AppRecordOjbects
which contain a VarFieldList from Primary or Auxiliary
tables.
To use this optional parameter, create a VarRecord
against the Primary table you are doing your
ReadWithWhere against. Get the VarFieldList of that
VarRecord through the Fields() method. Call SelectAll,
and pass it false to clear all fields. Then, explicitly turn
on the fields you wish to read by finding the Field on the
VarFieldList, and then calling that Field's Select() method
and passing it true.`,optional:!0}]},{meathodName:"clear",meathodDescription:"Removes all records from the list.",meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[]},{meathodName:"empty",meathodDescription:"Returns true if the list is empty.",meathodReturn:"bool",meathodReturnDescription:"Returns true if the list is empty; false if there are items in the list.",meathodParms:[]},{meathodName:"erase_at",meathodDescription:"Removes the item at specified index from the list.",meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"index",type:"int",description:"The zero-based index of the item to remove from the list.",optional:!1}]},{meathodName:"size",meathodDescription:"Returns the number of items in the list",meathodReturn:"size_t",meathodReturnDescription:"The number of items in the list.",meathodParms:[]},{meathodName:"Update",meathodDescription:"Perform a database update on all records in the list.",meathodReturn:"bool",meathodReturnDescription:`Returns true if all applicable records are successfully updated; false
otherwise.`,meathodParms:[]}],properties:[]},Change:{className:"Change",exposed:!1,inheritsFrom:"AppRecord",classDescription:`Each time users modify an SBM table in the system using a browser, it is logged as a
Change object in the TS_CHANGES table. This class is mainly used in conjunction with the
ChangeList class. Once a change list is found for a table record, the ChangeList is a list of
Change objects. This class can be used to access member variables that describe the
change. You can read and write with this class by using the inherited AppRecord methods.
All of the methods listed on this class directly relate to fields on the Changes table. Please
see the SBM schema document for details of each of the fields.`,properties:[{propertyName:"Action",propertyDescription:`Numeric code classifying the type of change, as listed in the Action
Codes table.
Code Description
0 A record was submitted
1 A record was modified
2 A record was deleted
3 An attachment was added
4 An attachment was updated
5 An attachment was deleted`,propertyType:"int",readOnly:!0},{propertyName:"FldId",propertyDescription:"TS_ID of the field that was modified during this change.",propertyType:"int",readOnly:!0},{propertyName:"FldType",propertyDescription:`Data type of the field that was modified during this change. ID
Types are listed in the following table.
Type Description
100 Numeric field (integer or floating point)
101 Text field
103 Date/Time field
104 Drop-down Selection field
105 Binary/Trinary field
106 The system-defined State field (a selection field)
107 User field (a selection field)
108 System-defined Project field (a selection field)
SBM ModScript Reference Guide 199
Type Description
109 Calculated Summation fields
110 Multi-Selection field
111 Contact Selection field
113 Incident Selection field
116 Folder link Selection field
122 Relational field
123 Sub-Relational field
124 System field
125 Multi-Relational field
126 Multi-User field
127 Multi-Group field`,propertyType:"int",readOnly:!0},{propertyName:"IssueId",propertyDescription:`TS_ID of the record that was modified. Use in conjunction with the
TableId property to find the record.`,propertyType:"int",readOnly:!0},{propertyName:"NewChar",propertyDescription:`If the modified field's data type was text, this field holds the
field's value after the change. Check the Type property to determine whether this
property is valid.`,propertyType:"string",readOnly:!0},{propertyName:"NewInt",propertyDescription:`If the modified field's data type was an integer, this field holds the
field's value after the change. Check the Type property to determine whether this
property is valid.`,propertyType:"int",readOnly:!0},{propertyName:"NewReal",propertyDescription:`If the modified field's data type was a floating point number,
this field holds the field's value after the change. Check the Type property to
determine whether this property is valid.`,propertyType:"double",readOnly:!0},{propertyName:"PriorChar",propertyDescription:`If the modified field's data type was text, this field holds the
field's value before the change. Check the Type property to determine whether this
property is valid.`,propertyType:"string",readOnly:!0},{propertyName:"PriorInt",propertyDescription:`If the modified field's data type was an integer, this field holds the
field's value before the change. Check the Type property to determine whether this
property is valid.`,propertyType:"int",readOnly:!0},{propertyName:"PriorReal",propertyDescription:`If the modified field's data type was a floating point number,
this field holds the field's value before the change. Check the Type property to
determine whether this property is valid.`,propertyType:"double",readOnly:!0},{propertyName:"TableId",propertyDescription:`Table ID of the record that was modified. Use in conjunction with the
IssueId property to find the record.`,propertyType:"int",readOnly:!0},{propertyName:"Time",propertyDescription:`Returns the time that change was made, as the number of seconds
since the beginning of Jan. 1, 1970. To get the time as a formatted string, use the
GetTime property. To convert it to a Date quantity, use the TimeT [page 296] class.`,propertyType:"int64_t",readOnly:!0},{propertyName:"Type",propertyDescription:`Identifies the database type of the quantity that changed, according to
the data types listed in the following table. If the quantity was an integer, then its
old and new values are available in the PriorInt and NewInt properties. If it was a
floating point number, then PriorReal and NewReal are valid. If it was text, then
PriorChar and NewChar are valid.
ID Description
0 Modification to an integer
1 Modification to a floating point
2 Modification to a Text field`,propertyType:"int",readOnly:!0},{propertyName:"UserId",propertyDescription:`TS_ID of the user who made the change. Use the GetUserName
method if the name of the user is needed.`,propertyType:"int",readOnly:!0}],meathods:[{meathodName:"GetTime",meathodDescription:"Returns the date and time of the change, formatted as a string.",meathodReturn:"string",meathodReturnDescription:"The date the change was created in the given format.",meathodParms:[{name:"format",type:"Variant",description:`If int, a code telling how to format the date/time.
If a User object, that user's date/time format preference
will be used. If omitted, the format defaults as indicated in
the following list.
Valid int format codes:
\u2022 1 \u2013 mm/dd/YYYY hh:mm:ss pp (default)
\u2022 2 \u2013 dd/mm/YYYY hh:mm:ss pp
("pp" denotes the AM/PM indicator)`,optional:!0}]},{meathodName:"GetUserName",meathodDescription:"Returns the display name of the user who made the change.",meathodReturn:"string",meathodReturnDescription:"The display name of the user who made the change.",meathodParms:[]},{meathodName:"Add",meathodDescription:`inherited -> AppRecord
This method adds a new row to a table. After creating an AppRecord from
the desired table and setting any desired field values, use this method to add the
record as a new row in its table. This is not for use with Primary tables, because
those items must go through a Submit transition. However, it is possible to make a
copy of a Primary table item using this method.`,meathodReturn:"int",meathodReturnDescription:`The TS_ID of the record added, which is unique to this table.
Zero means the record could not be added due to an error.`,meathodParms:[]},{meathodName:"Delete",meathodDescription:`inherited -> AppRecord
On most tables, this method removes the record from the database. On
tables such as States and Users, the records are marked as deleted but remain in
the database.`,meathodReturn:"bool",meathodReturnDescription:`True if the record is deleted from or marked as deleted in the
database.`,meathodParms:[]},{meathodName:"Fields",meathodDescription:`inherited -> AppRecord
Returns a VarFieldList containing all fields for a VarRecord.`,meathodReturn:"VarFieldList",meathodReturnDescription:`The list of fields from this AppRecord. If there is no FieldList for this
record, this method returns null. Use is_var_null() to check for
null.`,meathodParms:[]},{meathodName:"GetDisplayName",meathodDescription:`inherited -> AppRecord
Returns the display name of a record.`,meathodReturn:"string",meathodReturnDescription:"This record's display name, formatted according to table settings.",meathodParms:[]},{meathodName:"GetFieldValue",meathodDescription:`inherited -> AppRecord
Gets the value of any field.`,meathodReturn:"Variant",meathodReturnDescription:`The internal value for a field or column.
For Text fields, this is the exact value entered in the field;
for selection fields, the value is the database ID for the
selection. For values that are not Variant or TimeT, this
internally gets the value from the field as a Variant, and
then tries to convert the value to the requested type.
TimeT can be used with Date/Time fields to get the
internal date value.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueString",meathodDescription:`inherited -> AppRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"string",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueInt",meathodDescription:`inherited -> AppRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"int",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueInt64",meathodDescription:`inherited -> AppRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"int64_t",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueDouble",meathodDescription:`inherited -> AppRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"double",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueTimeT",meathodDescription:`inherited -> AppRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"TimeT",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetId",meathodDescription:`inherited -> AppRecord
Retrieves the current AppRecord's TS_ID.`,meathodReturn:"int",meathodReturnDescription:"TS_ID of the calling AppRecord.",meathodParms:[]},{meathodName:"GetUUID",meathodDescription:`inherited -> AppRecord
Returns the item's UUID, if applicable.`,meathodReturn:"string",meathodReturnDescription:"The item's UUID.",meathodParms:[]},{meathodName:"GetName",meathodDescription:`inherited -> AppRecord
Gets the calling AppRecord's "Name" system field.`,meathodReturn:"string",meathodReturnDescription:"A text string from the associated Name field.",meathodParms:[]},{meathodName:"GetRecTableId",meathodDescription:`inherited -> AppRecord
Returns the calling AppRecord's table ID.`,meathodReturn:"int",meathodReturnDescription:"The calling AppRecord's table ID.",meathodParms:[]},{meathodName:"GetSchemaColumns",meathodDescription:`inherited -> AppRecord
Returns a Vector of SchemaColumn objects. Will not include fields for VarRecord or
ProjectBasedRecord objects.`,meathodReturn:"Vector",meathodReturnDescription:`Each entry will be a SchemaColumn object representing a column in
the database that this item can interact with.`,meathodParms:[]},{meathodName:"HasVariableDBFields",meathodDescription:`inherited -> AppRecord
Tests whether the calling AppRecord is from a table with variable fields.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the calling AppRecord's table has variable fields.",meathodParms:[]},{meathodName:"IsFieldEqual",meathodDescription:`inherited -> AppRecord
Tests for equivalence between the specified field and a value formatted as a string.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the field is found and is equal; false otherwise.",meathodParms:[{name:"fieldNameOrId",type:["int","string"],description:`If a non-numeric string, the name of the field to be tested.
Otherwise, it is converted to a number and taken as the
TS_ID of the field to be tested.`,optional:!1},{name:"value",type:"string",description:`The value to be compared to. The field's value will be
formatted as a string and compared to this value.`,optional:!1}]},{meathodName:"IsLocked",meathodDescription:`inherited -> AppRecord
Tests whether the calling AppRecord has been locked, meaning it is in use by another
user.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record is locked by another user.",meathodParms:[{name:"lockedByThisUser",type:"bool",description:`Without an input parameter ( or with "false" as the input ),
IsLocked() means "Does someone else have this record
locked?"
With "true" as the input parameter, the meaning is "May I
(as the current user) update this record?"`,optional:!0}]},{meathodName:"Lock",meathodDescription:`inherited -> AppRecord
Locks the calling AppRecord, so other users will not attempt
to update it.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record is locked by another user.",meathodParms:[{name:"stealLock",type:"bool",description:`Defaults to false, meaning if this item is already
locked, no lock will be established.
If true, any existing lock on this record will be broken, and
changes made by the former lock holder are lost.`,optional:!0}]},{meathodName:"Read",meathodDescription:`inherited -> AppRecord
Looks up a row in the AppRecord's table`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the TS_ID or name was found, in which case the
calling AppRecord object becomes a copy of that row in the table.`,meathodParms:[{name:"recordIdOrName",type:["int","string"],description:`If this is an int or string that SBM ModScript can convert to
an int, it is taken as the value to search for in the TS_ID
column. All other parameter types are converted to a string
and searched for in the Name system field.`,optional:!1}]},{meathodName:"ReadWithWhere",meathodDescription:`inherited -> AppRecord
Used to find a record by passing in a string containing a SQL
"where" clause, not including the keyword "where".`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the method found the record, in which case the calling
object becomes a copy of the record found. If more than one record
is found, the first one is copied to the calling object.`,meathodParms:[{name:"whereClause",type:"string",description:`The SQL "where" clause to find the specific record in the
table, not including the keyword "where".`,optional:!1},{name:"queryParams",type:"Vector",description:`queryParams is an optional Vector storing SQL bind
parameters, where each entry is a Pair, where the first value
is the parameter type and the second value is the value to
bind to the SQL parameter. See Pair, Map_Pair, and
Dictionary_Pair [page 123].
For the type parameter, use DBTypeConstants [page 347].`,optional:!0}]},{meathodName:"ReadByColumn",meathodDescription:`inherited -> AppRecord
Reads any record type by a column value`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the item is read successfully; false if the item is not
found.`,meathodParms:[{name:"columnName",type:"string",description:"The database name of the column without the TS_ prefix.",optional:!1},{name:"value",type:"Variant",description:`Behavior depends on the Variant internal type:
\u2022 string \u2013 ReadByColumn() will succeed if the column is a
text column.
\u2022 int, int64_t, short, byte, or bool \u2013 ReadByColumn() will
succeed if the column is an integer column.
\u2022 float or double \u2013 ReadByColumn() will succeed if the
column is a floating point column.`,optional:!1}]},{meathodName:"ReadByColumnAndColumn",meathodDescription:`inherited -> AppRecord
Reads any record type by two column values`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the item is read successfully; false if the item is not
found.`,meathodParms:[{name:"columnName",type:"string",description:'The name of the column without the "TS_" prefix',optional:!1},{name:"value",type:"Variant",description:`Value must be an int, int64_t, short, byte, bool, or string
that can be converted to an int.`,optional:!1},{name:"column2Name",type:"string",description:'The name of the second column without the "TS_" prefix.',optional:!1},{name:"value2",type:"Variant",description:`Behavior depends on the Variant internal type:
\u2022 string \u2013 ReadByColumn() will succeed if the column is a
text column.
\u2022 int, int64_t, short, byte, or bool \u2013 ReadByColumn() will
succeed if the column is an integer column.
\u2022 float or double \u2013 Not supported.`,optional:!1}]},{meathodName:"ReadByUUID",meathodDescription:`inherited -> AppRecord
Reads the item using the UUID column, if it exists.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the record was found, in which case the
calling AppRecord object becomes a copy of that row in the table.`,meathodParms:[{name:"itemUUID",type:"string",description:"The UUID value that is passed in.",optional:!1}]},{meathodName:"SetFieldValue",meathodDescription:`inherited -> AppRecord
Sets the value of any column.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the column value was successfully set; false
otherwise.`,meathodParms:[{name:"name",type:"string",description:`The name of the column whose value will be set in the
AppRecord schema.`,optional:!1},{name:"value",type:["int","string","int64_t","double","TimeT","Variant"],description:`The new value for the column. The value
must be specified as it is stored in the database. For
example, for integer columns that are a foreign key to the
TS_USERS table, the value must be the database ID for
the user. TimeT values should only be used with columns
that represent dates, either as a native database date or
as a integer that represents dates in Unix Epoch time
format.`,optional:!1}]},{meathodName:"SetName",meathodDescription:`inherited -> AppRecord
Sets the "name" value of the calling object.`,meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"newName",type:"string",description:"Text to be used as the new name for the item.",optional:!1}]},{meathodName:"Unlock",meathodDescription:`inherited -> AppRecord
Unlocks the calling AppRecord, signaling that it is available
for other users.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the record was successfully unlocked or was not
locked to begin with.`,meathodParms:[{name:"currentUserOnly",type:"bool",description:`Defaults to false. If true, only the current user's
lock is unlocked. If false, any user's lock on this record is
removed.`,optional:!0}]},{meathodName:"Update",meathodDescription:`inherited -> AppRecord
This method updates the item in the database using the
values from the item.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record is updated in the database.",meathodParms:[]},{meathodName:"UpdateWithLock",meathodDescription:`inherited -> AppRecord
Updates the record that has been previously locked with
Lock() function.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record was successfully updated; false otherwise.",meathodParms:[{name:"stealLock",type:"bool",description:`Optional parameter that allows the user to skip the Lock()
function and steal the lock during the update. Defaults to
false. If true, any other user's existing lock will be broken,
causing that user's changes to be lost.`,optional:!0}]}],inheritsDone:!0},ChangeList:{className:"ChangeList",exposed:!1,inheritsFrom:"AppRecordList",classDescription:`A ChangeList is an AppRecordList that holds Change objects. Typically, a ChangeList
represents the history of an SBM item, using the ReadWithWhere() method to read all
Change records for a specific item.`,meathods:[{meathodName:"Count",meathodDescription:`inherited -> AppRecordList
Returns the number of items in the list.`,meathodReturn:"int",meathodReturnDescription:"The number of items in the list.",meathodParms:[]},{meathodName:"DeleteRecord",meathodDescription:`inherited -> AppRecordList
Removes the specified record from the list.`,meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"recordId",type:"int",description:"The TS_ID of the record to delete from the list.",optional:!1}]},{meathodName:"FindRecord",meathodDescription:`inherited -> AppRecordList
Find a specific record in the current list by matching its name or TS_ID.`,meathodReturn:"AppRecord",meathodReturnDescription:`The first AppRecord in the list that matches the given name or ID. If
there is no match, returns null. Use is_var_null() to check for null.`,meathodParms:[{name:"recordIdOrName",type:"Variant",description:`If this parameter is a non-numeric string, it is taken as
the desired record's name. Otherwise, it is converted to
an integer and taken as the desired record's TS_ID.`,optional:!1}]},{meathodName:"Length",meathodDescription:`inherited -> AppRecordList
Returns the number of items in the list.`,meathodReturn:"int",meathodReturnDescription:"The number of items in the list.",meathodParms:[]},{meathodName:"Read",meathodDescription:`inherited -> AppRecordList
Fills the AppRecordList from its table.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if successful; false otherwise. A successful read may
return zero results if no items match the query. Check for results by
calling the AppRecordList.empty() method.`,meathodParms:[]},{meathodName:"ReadByColumn",meathodDescription:`inherited -> AppRecordList
Reads any record list type by a column value`,meathodReturn:"bool",meathodReturnDescription:`Returns true if successful; false otherwise. A successful read may
return zero results if no items match the query. Check for results by
calling the AppRecordList.empty() method.`,meathodParms:[{name:"columnName",type:"string",description:'The name of the column without the "TS_" prefix.',optional:!1},{name:"value",type:"Variant",description:`Behavior depends on the Variant internal type:
\u2022 string \u2013 ReadByColumn() will succeed if the column is a
text column.
\u2022 int, int64_t, short, byte, or bool \u2013 ReadByColumn() will
succeed if the column is an integer column.
\u2022 float or double \u2013 ReadByColumn() will succeed if the
column is a floating point column.`,optional:!1}]},{meathodName:"ReadByColumnAndColumn",meathodDescription:`inherited -> AppRecordList
Reads any record list type by two column values.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if successful; false otherwise. A successful read may
return zero results if no items match the query. Check for results by
calling the AppRecordList.empty() method.`,meathodParms:[{name:"columnName",type:"string",description:'The name of the column without the "TS_" prefix',optional:!1},{name:"value",type:"Variant",description:`Value must be an int, int64_t, short, byte, bool, or string
that can be converted to an int.`,optional:!1},{name:"column2Name",type:"string",description:'The name of the second column without the "TS_" prefix.',optional:!1},{name:"value2",type:"Variant",description:`Behavior depends on the Variant internal type:
\u2022 string \u2013 ReadByColumn() will succeed if the column is a
text column.
\u2022 int, int64_t, short, byte, or bool \u2013 ReadByColumn() will
succeed if the column is an integer column.
\u2022 float or double \u2013 Not supported.`,optional:!1}]},{meathodName:"ReadWithWhere",meathodDescription:`inherited -> AppRecordList
An alternative to Read(), this method uses SQL to select
only certain records from the calling AppRecordList's table, rather than reading the entire
table.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if successful; false otherwise. A successful read may
return zero results if no items match the query. Check for results by
calling the AppRecordList.empty() method.`,meathodParms:[{name:"whereClause",type:"string",description:`A SQL "where clause" specifying the records to find. SBM
will build a SQL string requesting all fields for the calling
AppRecordList's table. The string contents of
whereClause will appear after the word "where" in this
SQL statement.`,optional:!1},{name:"params",type:"Vector",description:`Params is an optional Vector storing SQL bind
parameters, where each entry is a Pair, with the first
value as the parameter type and the second value as the
value to bind to the SQL parameter. See Pair, Map_Pair,
and Dictionary_Pair [page 123].
For the type parameter, use DBTypeConstants [page
347].`,optional:!0},{name:"orderBy",type:"string",description:`Identifies a column used for ordering the AppRecordList.
To use the templateRec parameter without the orderBy
parameter, use an empty string as a parameter for the
orderBy parameter.`,optional:!0},{name:"templateRec",type:"AppRecord",description:`Optional. Identifies which fields are read into all
AppRecords in the AppRecordList. Using this parameter
may improve performance when using AppRecordOjbects
which contain a VarFieldList from Primary or Auxiliary
tables.
To use this optional parameter, create a VarRecord
against the Primary table you are doing your
ReadWithWhere against. Get the VarFieldList of that
VarRecord through the Fields() method. Call SelectAll,
and pass it false to clear all fields. Then, explicitly turn
on the fields you wish to read by finding the Field on the
VarFieldList, and then calling that Field's Select() method
and passing it true.`,optional:!0}]},{meathodName:"clear",meathodDescription:`inherited -> AppRecordList
Removes all records from the list.`,meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[]},{meathodName:"empty",meathodDescription:`inherited -> AppRecordList
Returns true if the list is empty.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the list is empty; false if there are items in the list.",meathodParms:[]},{meathodName:"erase_at",meathodDescription:`inherited -> AppRecordList
Removes the item at specified index from the list.`,meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"index",type:"int",description:"The zero-based index of the item to remove from the list.",optional:!1}]},{meathodName:"size",meathodDescription:`inherited -> AppRecordList
Returns the number of items in the list`,meathodReturn:"size_t",meathodReturnDescription:"The number of items in the list.",meathodParms:[]},{meathodName:"Update",meathodDescription:`inherited -> AppRecordList
Perform a database update on all records in the list.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if all applicable records are successfully updated; false
otherwise.`,meathodParms:[]}],properties:[],inheritsDone:!0},DbImport:{className:"DbImport",exposed:!1,inheritsFrom:"",classDescription:`DbImport is a class that contains values representing the source database values. For
details on using DbImport, refer to Database Import Shell Properties [page 53].`,meathods:[{meathodName:"SrcColumn",meathodDescription:"The database column from the source database.",meathodReturn:"string",meathodReturnDescription:"The name of column from the source database.",meathodParms:[]},{meathodName:"SrcType",meathodDescription:"The database column type from the source database.",meathodReturn:"int",meathodReturnDescription:`The column type from the source database. 
The following database data types are supported:
\u2022 1 SQL_CHAR
\u2022 2 SQL_NUMERIC
\u2022 3 SQL_DECIMAL
\u2022 4 SQL_INTEGER
\u2022 5 SQL_SMALLINT
\u2022 6 SQL_FLOAT
\u2022 7 SQL_REAL
\u2022 8 SQL_DOUBLE
\u2022 9 SQL_DATE
\u2022 10 SQL_TIME
\u2022 11 SQL_TIMESTAMP
\u2022 12 SQL_VARCHAR
\u2022 91 SQL_TYPE_DATE
\u2022 92 SQL_TYPE_TIME
\u2022 93 SQL_TYPE_TIMESTAMP
\u2022 -1 SQL_LONGVARCHAR
\u2022 -5 SQL_BIGINT
\u2022 -6 SQL_TINYINT`,meathodParms:[]},{meathodName:"SrcLabel",meathodDescription:`If an "Int" type value maps to a reference table, this string value represents the label
from the source database.`,meathodReturn:"string",meathodReturnDescription:"The referenced label.",meathodParms:[]},{meathodName:"DestFldId",meathodDescription:"If mapped, this value represents the destination (SBM) field ID.",meathodReturn:"int",meathodReturnDescription:`The TS_ID of the field that this column is mapped to in the SBM
database.`,meathodParms:[]},{meathodName:"SrcData",meathodDescription:"The actual data from the source database.",meathodReturn:"Variant",meathodReturnDescription:"The data read from the database.",meathodParms:[]}],properties:[]},Dictionary:{className:"Dictionary",exposed:!1,inheritsFrom:"",classDescription:`A class for supporting dictionary objects in scripts that are converted from SBM AppScript
to SBM ModScript. A dictionary is a case sensitive key-value container. In general, use
ChaiScript's Map instead.`,meathods:[{meathodName:"at",meathodDescription:"Accesses value at location key. Throws exception if not found.",meathodReturn:"Variant",meathodReturnDescription:"Value at location key. Throws exception if not found.",meathodParms:[{name:"key",type:"string",description:"key",optional:!1}]},{meathodName:"size",meathodDescription:"Returns the count of items in the container.",meathodReturn:"uint64_t",meathodReturnDescription:"The count of items in the container.",meathodParms:[]},{meathodName:"empty",meathodDescription:"Returns if the container is empty.",meathodReturn:"bool",meathodReturnDescription:"True if the container is empty. False otherwise.",meathodParms:[]},{meathodName:"clear",meathodDescription:"Removes all items from the container",meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[]},{meathodName:"count",meathodDescription:"Returns 1 if key is found inside the container; otherwise, 0.",meathodReturn:"size_t",meathodReturnDescription:"1 if key is found inside the container; otherwise, 0.",meathodParms:[{name:"key",type:"string",description:"key",optional:!1}]},{meathodName:"insert",meathodDescription:`Inserts entry into the container.
Dictionary_Pair is the data type that represents an entry.`,meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"entry",type:"Dictionary_Pair",description:"Dictionary_Pair of the entry that you want to insert.",optional:!1}]},{meathodName:"Add",meathodDescription:`Adds an entry to the container. Throws if key is already in
the dictionary.`,meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"key",type:"string",description:"Key of the entry that you want to insert.",optional:!1},{name:"value",type:"Variant",description:"Value of the entry that you want to insert.",optional:!1}]},{meathodName:"Remove",meathodDescription:"Removes the entry with key. Returns true if found.",meathodReturn:"bool",meathodReturnDescription:"True if found.",meathodParms:[{name:"key",type:"string",description:"key",optional:!1}]},{meathodName:"RemoveAll",meathodDescription:"Removes all items from the container.",meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[]},{meathodName:"Count",meathodDescription:"Returns the count of items in the container.",meathodReturn:"int",meathodReturnDescription:"The count of items in the container.",meathodParms:[]},{meathodName:"Item",meathodDescription:"Accesses value at location key. Inserts value if not found.",meathodReturn:"Variant",meathodReturnDescription:"Value at location key.",meathodParms:[{name:"key",type:"string",description:"key",optional:!1}]},{meathodName:"Key",meathodDescription:"Inserts key if not found.",meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[]},{meathodName:"SetKey",meathodDescription:"Moves entry from keyOrig to keyNew.",meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"keyOrig",type:"string",description:"Orginal Key",optional:!1},{name:"keyNew",type:"string",description:"New Key",optional:!1}]},{meathodName:"Exists",meathodDescription:"Returns true if key is found.",meathodReturn:"bool",meathodReturnDescription:"True if key is found.",meathodParms:[{name:"key",type:"string",description:"key",optional:!1}]},{meathodName:"Keys",meathodDescription:"Returns a Vector of keys.",meathodReturn:"Vector",meathodReturnDescription:"Vector of keys.",meathodParms:[]},{meathodName:"Items",meathodDescription:"Returns a Vector of values.",meathodReturn:"Vector",meathodReturnDescription:"Vector of values.",meathodParms:[]}],properties:[]},Ext:{className:"Ext",exposed:!0,inheritsFrom:"",classDescription:`"Ext" is another SBM application object containing extensions to ChaiScript's built-in
	functions. These functions provide features or conversions not available in core ChaiScript.
	"Ext" contains merely functions, not data.`,meathods:[{meathodName:"AcquireLock",meathodDescription:`A mutex-locking function called by a concurrent script when
				it needs to use a shared resource that should only be accessed by one script at a time.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if a lock was acquired successfully. Returns false if the
				time-out period passed. If false, the script should not execute
				sensitive operations because another concurrent script has the lock.`,meathodParms:[{name:"msTimeout",type:"int",description:`Optional. The number of milliseconds to wait for the lock to
						be available. Defaults to an infinite wait.
						While the script is waiting, its execution is frozen. This may
						cause performance problems for long scripts or scripts that
						occur repeatedly. The wait occurs until other scripts have
						released the lock.
						All scripts share the same mutex.`,optional:!0}]},{meathodName:"AppendTextFile",meathodDescription:`Writes the string contents to the file referred to by string
				fileName, appending to the file's previous contents.`,meathodReturn:"Variant",meathodReturnDescription:'Returns the parameter "contents".',meathodParms:[{name:"fileName",type:"string",description:`Specifies a fully-qualified path and file name. The fileName
						can be any valid file path, including a path to a network
						device.`,optional:!1},{name:"contents",type:"Variant",description:"The value to be appended to the file contents",optional:!1}]},{meathodName:"CmdLineWait",meathodDescription:`Executes the string cmdLine in the operating system's command
				line interpreter and waits for the command to finish.`,meathodReturn:"int",meathodReturnDescription:`The command line interpreter's return value, which is the exit code
				of the program or batch file called.`,meathodParms:[{name:"cmdLine",type:"string",description:`This argument can contain redirect symbols, pipe characters,
						wildcards, and anything else legal at a command line
						prompt. The Operating System account that is executing the
						script on the server requires privilege to perform any
						command is invoked.`,optional:!1}]},{meathodName:"CreateAppRecord",meathodDescription:`Creates a new AppRecord object of a subtype appropriate for the database table specified
				by tableId.`,meathodReturn:"AppRecord",meathodReturnDescription:"The newly-created AppRecord object.",meathodParms:[{name:"tableId",type:"int",description:"A value from TS_TABLES. See Ext.TableId() [page 96].",optional:!1},{name:"fieldType",type:"int",description:`Optional. When creating field objects, specifies the data type
						to be stored in the field. See FieldTypeConstants [page 350].`,optional:!0}]},{meathodName:"CreateAppRecordList",meathodDescription:"Creates list objects that can hold multiple items from the given table.",meathodReturn:"AppRecordList",meathodReturnDescription:`The newly created AppRecordList object. Objects on the list are of
				type AppRecord, though they may represent objects of any
				AppRecord subtype.
				`,meathodParms:[{name:"tableId",type:"int",description:"A value from TS_TABLES. See Ext.TableId() [page 96].",optional:!1}]},{meathodName:"CreateProjectBasedRecord",meathodDescription:"Returns objects that are of the subtype ProjectBasedRecord.",meathodReturn:"ProjectBasedRecord",meathodReturnDescription:`The newly-created ProjectBasedRecord object containing a field
				list with all variable fields defined for the given table. The fields
				are created empty and can be written to individually or
				populated for a specific item using the Read() method. The
				returned object supports all functionality for a primary table
				item.
				`,meathodParms:[{name:"tableId",type:"int",description:"A value from TS_TABLES. See Ext.TableId() [page 96].",optional:!1}]},{meathodName:"CreateVarRecord",meathodDescription:"Returns objects of the subtype VarRecord.",meathodReturn:"VarRecord",meathodReturnDescription:`The newly-created VarRecord object containing a field list with all
				variable fields defined for the given table. The fields are created
				empty and can be written to individually or populated for a specific
				item using the Read() method.`,meathodParms:[{name:"tableId",type:"int",description:"A value from TS_TABLES. See Ext.TableId() [page 96].",optional:!1}]},{meathodName:"DateToDbLong",meathodDescription:"Converts the variant date value date to the int format used in an SBM database.",meathodReturn:"Variant",meathodReturnDescription:"Returns the int date value",meathodParms:[{name:"date",type:"Variant",description:`Use this parameter to convert the variant date value to the
						number of seconds since midnight, Jan. 1, 1970. This is not
						the same as converting date to an int using other built-in
						operators; that conversion yields the number of days since
						midnight Dec. 31, 1899.`,optional:!1}]},{meathodName:"DbLongToDate",meathodDescription:"Converts the int value to the variant date value format used in an SBM database.",meathodReturn:"Variant",meathodReturnDescription:"The variant date value.",meathodParms:[{name:"dateInt",type:"int",description:`Use this argument to convert the int date value from the
number of seconds since midnight, Jan. 1, 1970 to a Variant
storing a date. This is not the same as converting dateInt to
a Date using other built-in operators; that conversion
interprets dateInt as the number of days since midnight Dec.
31, 1899.`,optional:!1}]},{meathodName:"DirtyTableCache",meathodDescription:"Clears Application Engine cache for a specified table",meathodReturn:"bool",meathodReturnDescription:`Returns true if the table was cached. Throws an exception if the table
does not exist.`,meathodParms:[{name:"tableId",type:"int",description:"A value from TS_TABLES. See Ext.TableId() [page 96].",optional:!1}]},{meathodName:"EncodeHTML",meathodDescription:"Escapes HTML values in a string.",meathodReturn:"string",meathodReturnDescription:"The HTML-encoded version of the string value.",meathodParms:[{name:"value",type:"string",description:`The text that may have HTML characters that need to be
escaped.`,optional:!1}]},{meathodName:"EncodeJavaScript",meathodDescription:"Escapes JavaScript values in a string.",meathodReturn:"string",meathodReturnDescription:"The JavaScript-encoded version of the string value.",meathodParms:[{name:"value",type:"string",description:`The text that may have JavaScript characters that need to be
escaped.`,optional:!1}]},{meathodName:"EncodeURL",meathodDescription:"Escapes special character values in a URL string.",meathodReturn:"string",meathodReturnDescription:"The URL-encoded version of the string urlString.",meathodParms:[{name:"urlString",type:"string",description:"The text that may have characters that need to be escaped.",optional:!1}]},{meathodName:"FileExists",meathodDescription:"Determines whether the file specified in fileName exists.",meathodReturn:"bool",meathodReturnDescription:"Returns true if the file exists; false otherwise.",meathodParms:[{name:"fileName",type:"string",description:`Use the fileName parameter to provide a fully-qualified path
and file name. The fileName can be any valid file path,
including a path to a network device.`,optional:!1}]},{meathodName:"GetCharacterSet",meathodDescription:'(Deprecated\u2014always returns "UTF-8")',meathodReturn:"bool",meathodReturnDescription:"UTF-8",meathodParms:[]},{meathodName:"GetCompatibilityVersion",meathodDescription:"Gets the compatibility version. Refer to Ext.SetCompatibilityVersion().",meathodReturn:"string",meathodReturnDescription:`A string in the form majorVersion.minorVersion (for example,
"11.3").`,meathodParms:[]},{meathodName:"HasLock",meathodDescription:"Determines if the current script has a mutex lock.",meathodReturn:"bool",meathodReturnDescription:"Returns true if the current script has a lock; otherwise, false.",meathodParms:[]},{meathodName:"IsStringValidUTF8",meathodDescription:"Returns true if string contents are valid UTF8.",meathodReturn:"bool",meathodReturnDescription:"Returns true if the contents are valid UTF8.",meathodParms:[{name:"s",type:"string",description:"Use this parameter to provide a string to evaluate.",optional:!1}]},{meathodName:"LoadString",meathodDescription:`If your SBM user interface uses multiple languages, this function returns the specified
string ID in the language specified by each user.`,meathodReturn:"string",meathodReturnDescription:"Returns the translated string associated with the stringId.",meathodParms:[{name:"stringId",type:"string",description:`Use this parameter to specify a record in the String
Identifiers table. For example, Ext.LoadString(
"IDS_REPORTS_MYREPORTS" ) returns the string associated
with the My Reports text in the browser interface.`,optional:!1},{name:"arg (up to 6)",type:"string",description:`Use up to six optional parameters, which can be a string
identifier, in which case it will be loaded like stringId.
Otherwise, the value will be treated as literal text, integer,
double, etc.
These values will be used to format a string using the text
loaded from stringId as the format, with entries like {0}
that correspond to arg0 etc.`,optional:!0}]},{meathodName:"LockIsAvailable",meathodDescription:" Determines if the mutex lock is available to be acquired.",meathodReturn:"bool",meathodReturnDescription:`Returns true if a concurrent script lock is available to be acquired.
Returns false if the concurrent script lock is not available to be
acquired.`,meathodParms:[]},{meathodName:"LogErrorMsg",meathodDescription:"Writes an error message to the Application Event Log.",meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"msg",type:"Variant",description:`Use this parameter to provide an error message that
appears in the Windows Event Viewer.`,optional:!1}]},{meathodName:"LogInfoMsg",meathodDescription:"Writes an info message to the Application Event Log.",meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"msg",type:"Variant",description:`Use this parameter to provide an info message that
appears in the Windows Event Viewer.`,optional:!1}]},{meathodName:"LogWarningMsg",meathodDescription:"Writes a warning message to the Application Event Log.",meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"msg",type:"Variant",description:`Use this parameter to provide an warning message that
appears in the Windows Event Viewer.`,optional:!1}]},{meathodName:"NewTask",meathodDescription:`Executes an external application as a new process, passing any
given arguments.`,meathodReturn:"int",meathodReturnDescription:`Returns the operating system handle of the new process. This handle
is useless within SBM ModScript, but occasionally a script may have
some reason to pass the handle to another program. The
application's exit code is unavailable because this function generally
returns before the application exits.`,meathodParms:[{name:"appName",type:"string",description:`The appName can be any external application.
\u2022 If appName does not contain a path component, it is
searched for in the path list given by the optional SBM
registry setting "ScriptAppPath." If not found, appName
is then searched for in the path list given by the
operating system's environment variable "Path."
ScriptAppPath conforms to the same syntax as Path.
\u2022 Folder paths are separated by semicolons, environment
variables are surrounded by '%' characters, and spaces
do not need to be escaped or quoted.
\u2022 Unlike Path, any quotes in ScriptAppPath are interpreted
literally as part of the folder name.
\u2022 If appName does not contain a file extension, the system
tries .COM, .EXE, .BAT, and then .CMD. Arguments
following appName are optional.`,optional:!1},{name:"arg (up to 6)",type:"Variant",description:`Optional. Between 0-6 parameters to pass to the command.
For more than 6 parameters, pass a single Vector with unlimited parameters`,optional:!0}]},{meathodName:"NewTaskWait",meathodDescription:`Executes an external application, passing any given arguments
and awaiting the results.`,meathodReturn:"int",meathodReturnDescription:`Returns the application's exit code. For details about exit codes, refer
to Ext.CmdLineWait() [page 65].`,meathodParms:[{name:"appName",type:"string",description:`The appName can be any external application.
\u2022 If appName does not contain a path component, it is
searched for in the path list given by the optional SBM
registry setting "ScriptAppPath." If not found, appName
is then searched for in the path list given by the
operating system's environment variable "Path."
ScriptAppPath conforms to the same syntax as Path.
\u2022 Folder paths are separated by semicolons, environment
variables are surrounded by '%' characters, and spaces
do not need to be escaped or quoted.
\u2022 Unlike Path, any quotes in ScriptAppPath are interpreted
literally as part of the folder name.
\u2022 If appName does not contain a file extension, the system
tries .COM, .EXE, .BAT, and then .CMD. Arguments
following appName are optional.`,optional:!1},{name:"arg (up to 6)",type:"Variant",description:`Optional. Between 0-6 parameters to pass to the command.
For more than 6 parameters, pass a single Vector with unlimited parameters`,optional:!0}]},{meathodName:"OutputStreamExists",meathodDescription:`Checks if an output stream exists, such as an HTTP connection to the user's browser. If
so, scripts can write to it.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the output stream exists; false otherwise.",meathodParms:[]},{meathodName:"PrimaryTableId",meathodDescription:"Provides the TS_ID of a primary table for a specific application.",meathodReturn:"int",meathodReturnDescription:"Returns the TS_ID of the primary table for the specified application.",meathodParms:[{name:"applicationPrefixOrId",type:"Variant",description:`If applicationPrefixOrID is a non-numeric string, it is
taken as the application's prefix, such as TTT.
Because application prefixes do not need to be
unique, the first table with the prefix encountered is
returned. If applicationPrefixOrID is numeric, it is
taken as the application's TS_ID.`,optional:!1}]},{meathodName:"ReadTextFile",meathodDescription:"Opens, reads, and closes a file.",meathodReturn:"string",meathodReturnDescription:"Returns string holding entire contents of file referred to by fileName.",meathodParms:[{name:"fileName",type:"string",description:`Specifies a fully-qualified path and file name. The fileName
can be any valid file path, including a path to a network
device.`,optional:!1}]},{meathodName:"ReleaseLock",meathodDescription:"Releases a mutex-lock acquired by the current script",meathodReturn:"bool",meathodReturnDescription:`Returns true if the lock was released successfully. Returns false if the
lock was not released.`,meathodParms:[]},{meathodName:"SetCompatibilityVersion",meathodDescription:`The compatibility version controls how Variant interacts with dates:
\u2022 A value of 7.0 or higher will cause Variant to process date strings as ISO 8601 and
store them as a double, which holds the number of days since Dec 30, 1899.
\u2022 A compatibility version less than 7.0 will cause Variant to process date strings using
the system locale and store them as an integer number of seconds since Jan 1, 1970
(GMT).`,meathodReturn:"bool",meathodReturnDescription:"Returns true",meathodParms:[{name:"majorVersion",type:"int",description:`This is the major version number for the version of SBM with
which you want the script to be compatible.`,optional:!1},{name:"minorVersion",type:"int",description:`Optional; 0 by default. This is the minor version number for
the version of SBM with which you want your script to be
compatible.`,optional:!0}]},{meathodName:"SetCookie",meathodDescription:"Allows SBM ModScript to set HTTP cookies.",meathodReturn:"bool",meathodReturnDescription:`Returns true if the cookie is successfully added or modified; false
otherwise.`,meathodParms:[{name:"sNameValue",type:"string",description:`Use this parameter to add a cookie name that does not exist
or update the value of a cookie name that exists.
Example: "CookieName=CookieValue."`,optional:!1}]},{meathodName:"SetCookieExists",meathodDescription:"Determines if cookies are available in the context.",meathodReturn:"bool",meathodReturnDescription:"If true, SBM ModScript can set cookies; false otherwise.",meathodParms:[]},{meathodName:"ShellHasProp",meathodDescription:"Determines if Shell has a specified property.",meathodReturn:"bool",meathodReturnDescription:`Returns true if the string is the name of an existing shell property;
false otherwise.`,meathodParms:[{name:"propName",type:"string",description:"The name of the property to check.",optional:!1}]},{meathodName:"Sleep",meathodDescription:`Freezes script execution and the thread that called the script
for the specified number of milliseconds.`,meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"milliseconds",type:"int",description:`Specifies the number of milliseconds for which a script
execution should sleep.`,optional:!1}]},{meathodName:"SolutionIdForPrefix",meathodDescription:"Provides the TS_ID of the specified prefix string.",meathodReturn:"int",meathodReturnDescription:`Returns the TS_ID of the first application encountered in the
database with the specified prefix.`,meathodParms:[{name:"applicationPrefix",type:"string",description:`Specifies an application prefix string, such as "UBG".
Because application prefixes do not need to be unique, the
first table with the prefix encountered is returned.`,optional:!1}]},{meathodName:"SolutionIdForTable",meathodDescription:"Provides the TS_ID of an application with the specified primary table.",meathodReturn:"int",meathodReturnDescription:"Returns the TS_ID of the application. 0 if not found.",meathodParms:[{name:"table",type:"Variant",description:`Returns the TS_ID of the application with the specified
primary table. If table is a non-numeric string, it is taken
as the table's database name, such as "UBG_ISSUES". If it
is numeric, it is taken as the table's TS_ID.`,optional:!1}]},{meathodName:"TableDatabaseName",meathodDescription:"Returns the database name of the specified table.",meathodReturn:"string",meathodReturnDescription:`Returns the database name of the table if the display name exists. If
not, an empty string is returned.`,meathodParms:[{name:"table",type:"Variant",description:`Specifies a table's display name in order to return the
table's database name. If table is a non-numeric string, it
is taken as the table's display name, such as "Issues".
Otherwise, the parameter is converted to a number and
taken as the table's ID. Use caution when using the display
name because it can be changed in SBM Composer.`,optional:!1}]},{meathodName:"TableId",meathodDescription:`Returns the numeric ID of the specified table. If the table does not exist, returns zero.
Examples:
var myTableId = Ext.TableId( "APP_WORKFLOW", "workflow" ) );
var myTableId = Ext.TableId( 8, "workflow" ) );
var myTableId = Ext.TableId( "f4c6fa0d-5484-4dd3-b443-5363c4573a18",
"project" ) );`,meathodReturn:"int",meathodReturnDescription:"Returns the numeric ID of the specified table. If the table does not exist, returns zero",meathodParms:[{name:"tableName",type:"Variant",description:`Specifies a table display name or database name. If the
optional nameType parameter is omitted or equals
"database", the tableName parameter is taken as the
table's database name, such as "UBG_ISSUES". If the
nameType parameter equals "display", tableName is taken
as the table's display name, such as "Issues". Use caution
when using the display name because it can be changed in
SBM Composer.`,optional:!1},{name:"nameType",type:"string",description:`Behavior depends on the value:
\u2022 "database": (default) The tableName value is taken as
the TS_TABLES.TS_DBNAME of the table.
\u2022 "display": The tableName value is taken as the
TS_TABLES.TS_NAME of the table.
\u2022 "project": The tableName value is taken as the TS_ID,
internal name, or UUID, of a project. If a matching
project is found, the corresponding table ID is returned.
\u2022 "workflow": The tableName value is taken as the TS_ID,
internal name, or UUID, of a workflow. If a matching
workflow is found, the corresponding table ID is
returned.`,optional:!0}]},{meathodName:"TableSingularName",meathodDescription:"Returns the singular name of the specified table.",meathodReturn:"string",meathodReturnDescription:`Returns the singular name of the specified table. Returns an empty
string if the specified table does not exist.`,meathodParms:[{name:"table",type:"Variant",description:`Specifies a tables's database name or TS_ID. If a nonnumeric string, it is taken as the table's database name,
such as "UBG_ISSUES". Otherwise, the parameter is
converted to a number and taken as the table's ID.`,optional:!1}]},{meathodName:"TeamTrackDLLName",meathodDescription:"Provides the name of the SBM DLL.",meathodReturn:"string",meathodReturnDescription:'Returns "tmtrack.dll".',meathodParms:[]},{meathodName:"UnencodeURL",meathodDescription:"Converts URL-encoded version of urlString from hex-encoded sequences.",meathodReturn:"string",meathodReturnDescription:"The unencoded version of the string.",meathodParms:[{name:"urlString",type:"string",description:"Use this parameter to provide a string to unencode.",optional:!1}]},{meathodName:"WriteStream",meathodDescription:"Writes to the current output stream.",meathodReturn:"bool",meathodReturnDescription:"Returns true if the write operation succeeded; false otherwise.",meathodParms:[{name:"value",type:"Variant",description:`The value should be properly encoded, depending on the
context. For instance, if the context is pre-transition script,
the output is the transition form; therefore, the value
should be HTML or potentially JavaScript.`,optional:!1}]},{meathodName:"WriteTextFile",meathodDescription:`Writes the string contents to the file referred to by string
fileName, overwriting the file's previous contents.`,meathodReturn:"Variant",meathodReturnDescription:'Returns the string parameter "contents".',meathodParms:[{name:"fileName",type:"string",description:`Specifies a fully-qualified path and file name. The fileName
can be any valid file path, including a path to a network
device.`,optional:!1},{name:"contents",type:"Variant",description:"The value to be written to the file.",optional:!1}]}],properties:[]},Field:{className:"Field",exposed:!1,inheritsFrom:"AppRecord",classDescription:`A Field object represents a variable field, from a primary or auxiliary item. Field objects
are typically retrieved using the VarRecord method GetFieldValue() or the VarFieldList
method FindField(). Field methods allow you to read and write the field's value and control
whether it will be processed when the item is updated in the database.`,meathods:[{meathodName:"AppendJournalText",meathodDescription:"Appends text to a journal entry.",meathodReturn:"bool",meathodReturnDescription:`Returns true if the field is a Journal Text field (and hence the text
was appended); false if not.`,meathodParms:[{name:"value",type:"string",description:"The text to append as a journal entry.",optional:!1}]},{meathodName:"GetDbValueString",meathodDescription:"Gets the field's internal value as it is currently stored in the database.",meathodReturn:"string",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[]},{meathodName:"GetDbValueInt",meathodDescription:"Gets the field's internal value as it is currently stored in the database.",meathodReturn:"int",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[]},{meathodName:"GetDbValueInt64",meathodDescription:"Gets the field's internal value as it is currently stored in the database.",meathodReturn:"int64_t",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[]},{meathodName:"GetDbValueDouble",meathodDescription:"Gets the field's internal value as it is currently stored in the database.",meathodReturn:"double",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[]},{meathodName:"GetFieldValueTimeT",meathodDescription:"Gets the field's internal value as it is currently stored in the database.",meathodReturn:"TimeT",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[]},{meathodName:"GetDbValue",meathodDescription:"Gets the field's internal value as it is currently stored in the database.",meathodReturn:"Variant",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[]},{meathodName:"GetDisplayValue",meathodDescription:`Gets the current value of this field, reflecting any changes that may have been made since
the last database Update().`,meathodReturn:"string",meathodReturnDescription:"The field's current value as a formatted string.",meathodParms:[{name:"checkPrivs",type:"bool",description:`Defaults to true if omitted. If true, the value will
only be supplied if the current user has sufficient privileges
to see this field.`,optional:!0},{name:"format",type:"string",description:`For File or URL fields, the value "json" indicates
that the output should be a JSON string value.`,optional:!0}]},{meathodName:"GetRequiredFlag",meathodDescription:"Used to check whether or not a field is required.",meathodReturn:"int",meathodReturnDescription:`Returns a value that corresponds to the constant
FieldRequiredConstants. For details, see FieldRequiredConstants
[page 350].`,meathodParms:[]},{meathodName:"GetSelectionList",meathodDescription:"Returns a list of all possible selection values for single and multi-select fields.",meathodReturn:"AppRecordList",meathodReturnDescription:`All possible selections, as AppRecord objects from the
TS_SELECTIONS table.`,meathodParms:[]},{meathodName:"GetType",meathodDescription:"Returns a code that identifies the type of data stored in a field.",meathodReturn:"int",meathodReturnDescription:`A code that identifies the type of data stored in the field. See
FieldTypeConstants [page 350].`,meathodParms:[]},{meathodName:"GetTypeString",meathodDescription:"Returns a string that identifies the type of data stored in a field.",meathodReturn:"string",meathodReturnDescription:"A string that identifies the type of data stored in the field.",meathodParms:[]},{meathodName:"GetValueString",meathodDescription:`Gets the field's internal value without checking privileges, including changes made to the
value during the transition if in a transition context.`,meathodReturn:"string",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[]},{meathodName:"GetValueInt",meathodDescription:`Gets the field's internal value without checking privileges, including changes made to the
value during the transition if in a transition context.`,meathodReturn:"int",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[]},{meathodName:"GetValueInt64",meathodDescription:`Gets the field's internal value without checking privileges, including changes made to the
value during the transition if in a transition context.`,meathodReturn:"int64_t",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[]},{meathodName:"GetValueDouble",meathodDescription:`Gets the field's internal value without checking privileges, including changes made to the
value during the transition if in a transition context.`,meathodReturn:"double",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[]},{meathodName:"GetValueTimeT",meathodDescription:`Gets the field's internal value without checking privileges, including changes made to the
value during the transition if in a transition context.`,meathodReturn:"TimeT",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[]},{meathodName:"GetValue",meathodDescription:`Gets the field's internal value without checking privileges, including changes made to the
value during the transition if in a transition context.`,meathodReturn:"Variant",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[]},{meathodName:"IsAuto",meathodDescription:"Determines whether this field is set to be automatically populated.",meathodReturn:"bool",meathodReturnDescription:"Returns true if this field is automatically populated; false if not.",meathodParms:[]},{meathodName:"IsBlank",meathodDescription:"Determines whether a field does not contain data.",meathodReturn:"bool",meathodReturnDescription:"Returns true if this field contains no data; false if it does.",meathodParms:[]},{meathodName:"IsDbBlank",meathodDescription:"Determines whether a field does not contain data stored in the database.",meathodReturn:"bool",meathodReturnDescription:"Returns true if this field contains data; false if not.",meathodParms:[]},{meathodName:"IsSelected",meathodDescription:`Determines whether a field has been selected for Update() processing by the Select()
method.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if selected; false if not.",meathodParms:[]},{meathodName:"Select",meathodDescription:"Sets or clears a field's select flag to control processing during the next Update().",meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"selectFlag",type:"bool",description:`If true, the field will be processed during the next Update().
If false, it will be skipped unless overridden by the
VarFieldList method SelectAll().`,optional:!1}]},{meathodName:"SetBlankValue",meathodDescription:`Removes data from a field, returning it to an uninitialized
state.`,meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[]},{meathodName:"SetValue",meathodDescription:"Sets or changes a field's value to the internal value supplied.",meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"value",type:["int","string","int64_t","double","TimeT","Variant"],description:`The internal value for the field. For Text fields, this is the
exact value entered in the field.
TimeT can be used with Date/Time fields to set the internal
date value.`,optional:!1}]},{meathodName:"Add",meathodDescription:`inherited -> AppRecord
This method adds a new row to a table. After creating an AppRecord from
the desired table and setting any desired field values, use this method to add the
record as a new row in its table. This is not for use with Primary tables, because
those items must go through a Submit transition. However, it is possible to make a
copy of a Primary table item using this method.`,meathodReturn:"int",meathodReturnDescription:`The TS_ID of the record added, which is unique to this table.
Zero means the record could not be added due to an error.`,meathodParms:[]},{meathodName:"Delete",meathodDescription:`inherited -> AppRecord
On most tables, this method removes the record from the database. On
tables such as States and Users, the records are marked as deleted but remain in
the database.`,meathodReturn:"bool",meathodReturnDescription:`True if the record is deleted from or marked as deleted in the
database.`,meathodParms:[]},{meathodName:"Fields",meathodDescription:`inherited -> AppRecord
Returns a VarFieldList containing all fields for a VarRecord.`,meathodReturn:"VarFieldList",meathodReturnDescription:`The list of fields from this AppRecord. If there is no FieldList for this
record, this method returns null. Use is_var_null() to check for
null.`,meathodParms:[]},{meathodName:"GetDisplayName",meathodDescription:`inherited -> AppRecord
Returns the display name of a record.`,meathodReturn:"string",meathodReturnDescription:"This record's display name, formatted according to table settings.",meathodParms:[]},{meathodName:"GetFieldValue",meathodDescription:`inherited -> AppRecord
Gets the value of any field.`,meathodReturn:"Variant",meathodReturnDescription:`The internal value for a field or column.
For Text fields, this is the exact value entered in the field;
for selection fields, the value is the database ID for the
selection. For values that are not Variant or TimeT, this
internally gets the value from the field as a Variant, and
then tries to convert the value to the requested type.
TimeT can be used with Date/Time fields to get the
internal date value.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueString",meathodDescription:`inherited -> AppRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"string",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueInt",meathodDescription:`inherited -> AppRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"int",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueInt64",meathodDescription:`inherited -> AppRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"int64_t",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueDouble",meathodDescription:`inherited -> AppRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"double",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetId",meathodDescription:`inherited -> AppRecord
Retrieves the current AppRecord's TS_ID.`,meathodReturn:"int",meathodReturnDescription:"TS_ID of the calling AppRecord.",meathodParms:[]},{meathodName:"GetUUID",meathodDescription:`inherited -> AppRecord
Returns the item's UUID, if applicable.`,meathodReturn:"string",meathodReturnDescription:"The item's UUID.",meathodParms:[]},{meathodName:"GetName",meathodDescription:`inherited -> AppRecord
Gets the calling AppRecord's "Name" system field.`,meathodReturn:"string",meathodReturnDescription:"A text string from the associated Name field.",meathodParms:[]},{meathodName:"GetRecTableId",meathodDescription:`inherited -> AppRecord
Returns the calling AppRecord's table ID.`,meathodReturn:"int",meathodReturnDescription:"The calling AppRecord's table ID.",meathodParms:[]},{meathodName:"GetSchemaColumns",meathodDescription:`inherited -> AppRecord
Returns a Vector of SchemaColumn objects. Will not include fields for VarRecord or
ProjectBasedRecord objects.`,meathodReturn:"Vector",meathodReturnDescription:`Each entry will be a SchemaColumn object representing a column in
the database that this item can interact with.`,meathodParms:[]},{meathodName:"HasVariableDBFields",meathodDescription:`inherited -> AppRecord
Tests whether the calling AppRecord is from a table with variable fields.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the calling AppRecord's table has variable fields.",meathodParms:[]},{meathodName:"IsFieldEqual",meathodDescription:`inherited -> AppRecord
Tests for equivalence between the specified field and a value formatted as a string.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the field is found and is equal; false otherwise.",meathodParms:[{name:"fieldNameOrId",type:["int","string"],description:`If a non-numeric string, the name of the field to be tested.
Otherwise, it is converted to a number and taken as the
TS_ID of the field to be tested.`,optional:!1},{name:"value",type:"string",description:`The value to be compared to. The field's value will be
formatted as a string and compared to this value.`,optional:!1}]},{meathodName:"IsLocked",meathodDescription:`inherited -> AppRecord
Tests whether the calling AppRecord has been locked, meaning it is in use by another
user.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record is locked by another user.",meathodParms:[{name:"lockedByThisUser",type:"bool",description:`Without an input parameter ( or with "false" as the input ),
IsLocked() means "Does someone else have this record
locked?"
With "true" as the input parameter, the meaning is "May I
(as the current user) update this record?"`,optional:!0}]},{meathodName:"Lock",meathodDescription:`inherited -> AppRecord
Locks the calling AppRecord, so other users will not attempt
to update it.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record is locked by another user.",meathodParms:[{name:"stealLock",type:"bool",description:`Defaults to false, meaning if this item is already
locked, no lock will be established.
If true, any existing lock on this record will be broken, and
changes made by the former lock holder are lost.`,optional:!0}]},{meathodName:"Read",meathodDescription:`inherited -> AppRecord
Looks up a row in the AppRecord's table`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the TS_ID or name was found, in which case the
calling AppRecord object becomes a copy of that row in the table.`,meathodParms:[{name:"recordIdOrName",type:["int","string"],description:`If this is an int or string that SBM ModScript can convert to
an int, it is taken as the value to search for in the TS_ID
column. All other parameter types are converted to a string
and searched for in the Name system field.`,optional:!1}]},{meathodName:"ReadWithWhere",meathodDescription:`inherited -> AppRecord
Used to find a record by passing in a string containing a SQL
"where" clause, not including the keyword "where".`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the method found the record, in which case the calling
object becomes a copy of the record found. If more than one record
is found, the first one is copied to the calling object.`,meathodParms:[{name:"whereClause",type:"string",description:`The SQL "where" clause to find the specific record in the
table, not including the keyword "where".`,optional:!1},{name:"queryParams",type:"Vector",description:`queryParams is an optional Vector storing SQL bind
parameters, where each entry is a Pair, where the first value
is the parameter type and the second value is the value to
bind to the SQL parameter. See Pair, Map_Pair, and
Dictionary_Pair [page 123].
For the type parameter, use DBTypeConstants [page 347].`,optional:!0}]},{meathodName:"ReadByColumn",meathodDescription:`inherited -> AppRecord
Reads any record type by a column value`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the item is read successfully; false if the item is not
found.`,meathodParms:[{name:"columnName",type:"string",description:"The database name of the column without the TS_ prefix.",optional:!1},{name:"value",type:"Variant",description:`Behavior depends on the Variant internal type:
\u2022 string \u2013 ReadByColumn() will succeed if the column is a
text column.
\u2022 int, int64_t, short, byte, or bool \u2013 ReadByColumn() will
succeed if the column is an integer column.
\u2022 float or double \u2013 ReadByColumn() will succeed if the
column is a floating point column.`,optional:!1}]},{meathodName:"ReadByColumnAndColumn",meathodDescription:`inherited -> AppRecord
Reads any record type by two column values`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the item is read successfully; false if the item is not
found.`,meathodParms:[{name:"columnName",type:"string",description:'The name of the column without the "TS_" prefix',optional:!1},{name:"value",type:"Variant",description:`Value must be an int, int64_t, short, byte, bool, or string
that can be converted to an int.`,optional:!1},{name:"column2Name",type:"string",description:'The name of the second column without the "TS_" prefix.',optional:!1},{name:"value2",type:"Variant",description:`Behavior depends on the Variant internal type:
\u2022 string \u2013 ReadByColumn() will succeed if the column is a
text column.
\u2022 int, int64_t, short, byte, or bool \u2013 ReadByColumn() will
succeed if the column is an integer column.
\u2022 float or double \u2013 Not supported.`,optional:!1}]},{meathodName:"ReadByUUID",meathodDescription:`inherited -> AppRecord
Reads the item using the UUID column, if it exists.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the record was found, in which case the
calling AppRecord object becomes a copy of that row in the table.`,meathodParms:[{name:"itemUUID",type:"string",description:"The UUID value that is passed in.",optional:!1}]},{meathodName:"SetFieldValue",meathodDescription:`inherited -> AppRecord
Sets the value of any column.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the column value was successfully set; false
otherwise.`,meathodParms:[{name:"name",type:"string",description:`The name of the column whose value will be set in the
AppRecord schema.`,optional:!1},{name:"value",type:["int","string","int64_t","double","TimeT","Variant"],description:`The new value for the column. The value
must be specified as it is stored in the database. For
example, for integer columns that are a foreign key to the
TS_USERS table, the value must be the database ID for
the user. TimeT values should only be used with columns
that represent dates, either as a native database date or
as a integer that represents dates in Unix Epoch time
format.`,optional:!1}]},{meathodName:"SetName",meathodDescription:`inherited -> AppRecord
Sets the "name" value of the calling object.`,meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"newName",type:"string",description:"Text to be used as the new name for the item.",optional:!1}]},{meathodName:"Unlock",meathodDescription:`inherited -> AppRecord
Unlocks the calling AppRecord, signaling that it is available
for other users.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the record was successfully unlocked or was not
locked to begin with.`,meathodParms:[{name:"currentUserOnly",type:"bool",description:`Defaults to false. If true, only the current user's
lock is unlocked. If false, any user's lock on this record is
removed.`,optional:!0}]},{meathodName:"Update",meathodDescription:`inherited -> AppRecord
This method updates the item in the database using the
values from the item.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record is updated in the database.",meathodParms:[]},{meathodName:"UpdateWithLock",meathodDescription:`inherited -> AppRecord
Updates the record that has been previously locked with
Lock() function.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record was successfully updated; false otherwise.",meathodParms:[{name:"stealLock",type:"bool",description:`Optional parameter that allows the user to skip the Lock()
function and steal the lock during the update. Defaults to
false. If true, any other user's existing lock will be broken,
causing that user's changes to be lost.`,optional:!0}]}],properties:[],inheritsDone:!0},Folder:{className:"Folder",exposed:!1,inheritsFrom:"TreeItem",classDescription:`Folder objects provide a convenient interface for examining folder contents and adding or
removing folder items. A Folder object describes a single folder and corresponds to a
record in the TS_FOLDERS table. To examine the folder hierarchy or generate the full
folder name, use inherited TreeItem methods. To generate a list of items in an folder, see
FolderItemList.`,meathods:[{meathodName:"AddItem",meathodDescription:"Adds an AppRecord item to a folder.",meathodReturn:"bool",meathodReturnDescription:"Returns true if the item is added successfully; false if not.",meathodParms:[{name:"rec",type:"AppRecord",description:"The item to add to the folder.",optional:!1}]},{meathodName:"Contains",meathodDescription:"Used to determine whether a given item is in the current folder.",meathodReturn:"bool",meathodReturnDescription:"Returns true if this folder contains the item; false if not.",meathodParms:[{name:"tableId",type:"int",description:"Table ID of the item to search for.",optional:!1},{name:"recId",type:"int",description:"TS_ID of the item to search for.",optional:!1}]},{meathodName:"DeleteItem",meathodDescription:"Removes an AppRecord item from a folder.",meathodReturn:"bool",meathodReturnDescription:"Returns true if removed successfully; false if not.",meathodParms:[{name:"rec",type:"AppRecord",description:"The item to remove from the folder.",optional:!1}]},{meathodName:"Add",meathodDescription:`inherited -> AppRecord -> TreeItem
This method adds a new row to a table. After creating an AppRecord from
the desired table and setting any desired field values, use this method to add the
record as a new row in its table. This is not for use with Primary tables, because
those items must go through a Submit transition. However, it is possible to make a
copy of a Primary table item using this method.`,meathodReturn:"int",meathodReturnDescription:`The TS_ID of the record added, which is unique to this table.
Zero means the record could not be added due to an error.`,meathodParms:[]},{meathodName:"Delete",meathodDescription:`inherited -> AppRecord -> TreeItem
On most tables, this method removes the record from the database. On
tables such as States and Users, the records are marked as deleted but remain in
the database.`,meathodReturn:"bool",meathodReturnDescription:`True if the record is deleted from or marked as deleted in the
database.`,meathodParms:[]},{meathodName:"Fields",meathodDescription:`inherited -> AppRecord -> TreeItem
Returns a VarFieldList containing all fields for a VarRecord.`,meathodReturn:"VarFieldList",meathodReturnDescription:`The list of fields from this AppRecord. If there is no FieldList for this
record, this method returns null. Use is_var_null() to check for
null.`,meathodParms:[]},{meathodName:"GetDisplayName",meathodDescription:`inherited -> AppRecord -> TreeItem
Returns the display name of a record.`,meathodReturn:"string",meathodReturnDescription:"This record's display name, formatted according to table settings.",meathodParms:[]},{meathodName:"GetFieldValue",meathodDescription:`inherited -> AppRecord -> TreeItem
Gets the value of any field.`,meathodReturn:"Variant",meathodReturnDescription:`The internal value for a field or column.
For Text fields, this is the exact value entered in the field;
for selection fields, the value is the database ID for the
selection. For values that are not Variant or TimeT, this
internally gets the value from the field as a Variant, and
then tries to convert the value to the requested type.
TimeT can be used with Date/Time fields to get the
internal date value.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueString",meathodDescription:`inherited -> AppRecord -> TreeItem
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"string",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueInt",meathodDescription:`inherited -> AppRecord -> TreeItem
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"int",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueInt64",meathodDescription:`inherited -> AppRecord -> TreeItem
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"int64_t",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueDouble",meathodDescription:`inherited -> AppRecord -> TreeItem
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"double",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueTimeT",meathodDescription:`inherited -> AppRecord -> TreeItem
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"TimeT",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetId",meathodDescription:`inherited -> AppRecord -> TreeItem
Retrieves the current AppRecord's TS_ID.`,meathodReturn:"int",meathodReturnDescription:"TS_ID of the calling AppRecord.",meathodParms:[]},{meathodName:"GetUUID",meathodDescription:`inherited -> AppRecord -> TreeItem
Returns the item's UUID, if applicable.`,meathodReturn:"string",meathodReturnDescription:"The item's UUID.",meathodParms:[]},{meathodName:"GetName",meathodDescription:`inherited -> AppRecord -> TreeItem
Gets the calling AppRecord's "Name" system field.`,meathodReturn:"string",meathodReturnDescription:"A text string from the associated Name field.",meathodParms:[]},{meathodName:"GetRecTableId",meathodDescription:`inherited -> AppRecord -> TreeItem
Returns the calling AppRecord's table ID.`,meathodReturn:"int",meathodReturnDescription:"The calling AppRecord's table ID.",meathodParms:[]},{meathodName:"GetSchemaColumns",meathodDescription:`inherited -> AppRecord -> TreeItem
Returns a Vector of SchemaColumn objects. Will not include fields for VarRecord or
ProjectBasedRecord objects.`,meathodReturn:"Vector",meathodReturnDescription:`Each entry will be a SchemaColumn object representing a column in
the database that this item can interact with.`,meathodParms:[]},{meathodName:"HasVariableDBFields",meathodDescription:`inherited -> AppRecord -> TreeItem
Tests whether the calling AppRecord is from a table with variable fields.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the calling AppRecord's table has variable fields.",meathodParms:[]},{meathodName:"IsFieldEqual",meathodDescription:`inherited -> AppRecord -> TreeItem
Tests for equivalence between the specified field and a value formatted as a string.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the field is found and is equal; false otherwise.",meathodParms:[{name:"fieldNameOrId",type:["int","string"],description:`If a non-numeric string, the name of the field to be tested.
Otherwise, it is converted to a number and taken as the
TS_ID of the field to be tested.`,optional:!1},{name:"value",type:"string",description:`The value to be compared to. The field's value will be
formatted as a string and compared to this value.`,optional:!1}]},{meathodName:"IsLocked",meathodDescription:`inherited -> AppRecord -> TreeItem
Tests whether the calling AppRecord has been locked, meaning it is in use by another
user.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record is locked by another user.",meathodParms:[{name:"lockedByThisUser",type:"bool",description:`Without an input parameter ( or with "false" as the input ),
IsLocked() means "Does someone else have this record
locked?"
With "true" as the input parameter, the meaning is "May I
(as the current user) update this record?"`,optional:!0}]},{meathodName:"Lock",meathodDescription:`inherited -> AppRecord -> TreeItem
Locks the calling AppRecord, so other users will not attempt
to update it.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record is locked by another user.",meathodParms:[{name:"stealLock",type:"bool",description:`Defaults to false, meaning if this item is already
locked, no lock will be established.
If true, any existing lock on this record will be broken, and
changes made by the former lock holder are lost.`,optional:!0}]},{meathodName:"Read",meathodDescription:`inherited -> AppRecord -> TreeItem
Looks up a row in the AppRecord's table`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the TS_ID or name was found, in which case the
calling AppRecord object becomes a copy of that row in the table.`,meathodParms:[{name:"recordIdOrName",type:["int","string"],description:`If this is an int or string that SBM ModScript can convert to
an int, it is taken as the value to search for in the TS_ID
column. All other parameter types are converted to a string
and searched for in the Name system field.`,optional:!1}]},{meathodName:"ReadWithWhere",meathodDescription:`inherited -> AppRecord -> TreeItem
Used to find a record by passing in a string containing a SQL
"where" clause, not including the keyword "where".`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the method found the record, in which case the calling
object becomes a copy of the record found. If more than one record
is found, the first one is copied to the calling object.`,meathodParms:[{name:"whereClause",type:"string",description:`The SQL "where" clause to find the specific record in the
table, not including the keyword "where".`,optional:!1},{name:"queryParams",type:"Vector",description:`queryParams is an optional Vector storing SQL bind
parameters, where each entry is a Pair, where the first value
is the parameter type and the second value is the value to
bind to the SQL parameter. See Pair, Map_Pair, and
Dictionary_Pair [page 123].
For the type parameter, use DBTypeConstants [page 347].`,optional:!0}]},{meathodName:"ReadByColumn",meathodDescription:`inherited -> AppRecord -> TreeItem
Reads any record type by a column value`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the item is read successfully; false if the item is not
found.`,meathodParms:[{name:"columnName",type:"string",description:"The database name of the column without the TS_ prefix.",optional:!1},{name:"value",type:"Variant",description:`Behavior depends on the Variant internal type:
\u2022 string \u2013 ReadByColumn() will succeed if the column is a
text column.
\u2022 int, int64_t, short, byte, or bool \u2013 ReadByColumn() will
succeed if the column is an integer column.
\u2022 float or double \u2013 ReadByColumn() will succeed if the
column is a floating point column.`,optional:!1}]},{meathodName:"ReadByColumnAndColumn",meathodDescription:`inherited -> AppRecord -> TreeItem
Reads any record type by two column values`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the item is read successfully; false if the item is not
found.`,meathodParms:[{name:"columnName",type:"string",description:'The name of the column without the "TS_" prefix',optional:!1},{name:"value",type:"Variant",description:`Value must be an int, int64_t, short, byte, bool, or string
that can be converted to an int.`,optional:!1},{name:"column2Name",type:"string",description:'The name of the second column without the "TS_" prefix.',optional:!1},{name:"value2",type:"Variant",description:`Behavior depends on the Variant internal type:
\u2022 string \u2013 ReadByColumn() will succeed if the column is a
text column.
\u2022 int, int64_t, short, byte, or bool \u2013 ReadByColumn() will
succeed if the column is an integer column.
\u2022 float or double \u2013 Not supported.`,optional:!1}]},{meathodName:"ReadByUUID",meathodDescription:`inherited -> AppRecord -> TreeItem
Reads the item using the UUID column, if it exists.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the record was found, in which case the
calling AppRecord object becomes a copy of that row in the table.`,meathodParms:[{name:"itemUUID",type:"string",description:"The UUID value that is passed in.",optional:!1}]},{meathodName:"SetFieldValue",meathodDescription:`inherited -> AppRecord -> TreeItem
Sets the value of any column.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the column value was successfully set; false
otherwise.`,meathodParms:[{name:"name",type:"string",description:`The name of the column whose value will be set in the
AppRecord schema.`,optional:!1},{name:"value",type:["int","string","int64_t","double","TimeT","Variant"],description:`The new value for the column. The value
must be specified as it is stored in the database. For
example, for integer columns that are a foreign key to the
TS_USERS table, the value must be the database ID for
the user. TimeT values should only be used with columns
that represent dates, either as a native database date or
as a integer that represents dates in Unix Epoch time
format.`,optional:!1}]},{meathodName:"SetName",meathodDescription:`inherited -> AppRecord -> TreeItem
Sets the "name" value of the calling object.`,meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"newName",type:"string",description:"Text to be used as the new name for the item.",optional:!1}]},{meathodName:"Unlock",meathodDescription:`inherited -> AppRecord -> TreeItem
Unlocks the calling AppRecord, signaling that it is available
for other users.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the record was successfully unlocked or was not
locked to begin with.`,meathodParms:[{name:"currentUserOnly",type:"bool",description:`Defaults to false. If true, only the current user's
lock is unlocked. If false, any user's lock on this record is
removed.`,optional:!0}]},{meathodName:"Update",meathodDescription:`inherited -> AppRecord -> TreeItem
This method updates the item in the database using the
values from the item.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record is updated in the database.",meathodParms:[]},{meathodName:"UpdateWithLock",meathodDescription:`inherited -> AppRecord -> TreeItem
Updates the record that has been previously locked with
Lock() function.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record was successfully updated; false otherwise.",meathodParms:[{name:"stealLock",type:"bool",description:`Optional parameter that allows the user to skip the Lock()
function and steal the lock during the update. Defaults to
false. If true, any other user's existing lock will be broken,
causing that user's changes to be lost.`,optional:!0}]}],properties:[],inheritsDone:!0},FolderItem:{className:"FolderItem",exposed:!1,inheritsFrom:"AppRecord",classDescription:`The TS_FOLDERITEMS table identifies the contents of all folders. Each record identifies
one item of one folder by associating three TS_IDs: the folder's ID, the table ID of the
item stored in the folder, and the TS_ID of the item. A folder has one entry in the
TS_FOLDERITEMS table for each primary item, auxiliary item, and report it contains, and
one entry in the TS_URLSTORE table for each URL it contains. Though it is possible to
supply the table ID of a system table other than TS_REPORTS, folder items created this
way are not supported and will yield undefined behavior when accessed by a user.`,properties:[{propertyName:"FolderId",propertyDescription:"TS_ID of the folder.",propertyType:"int",readOnly:!0},{propertyName:"TableId",propertyDescription:"Table ID of the item stored in this folder.",propertyType:"int",readOnly:!0},{propertyName:"RecId",propertyDescription:"TS_ID of the item stored in this folder.",propertyType:"int",readOnly:!0}],meathods:[{meathodName:"Add",meathodDescription:`inherited -> AppRecord
This method adds a new row to a table. After creating an AppRecord from
the desired table and setting any desired field values, use this method to add the
record as a new row in its table. This is not for use with Primary tables, because
those items must go through a Submit transition. However, it is possible to make a
copy of a Primary table item using this method.`,meathodReturn:"int",meathodReturnDescription:`The TS_ID of the record added, which is unique to this table.
Zero means the record could not be added due to an error.`,meathodParms:[]},{meathodName:"Delete",meathodDescription:`inherited -> AppRecord
On most tables, this method removes the record from the database. On
tables such as States and Users, the records are marked as deleted but remain in
the database.`,meathodReturn:"bool",meathodReturnDescription:`True if the record is deleted from or marked as deleted in the
database.`,meathodParms:[]},{meathodName:"Fields",meathodDescription:`inherited -> AppRecord
Returns a VarFieldList containing all fields for a VarRecord.`,meathodReturn:"VarFieldList",meathodReturnDescription:`The list of fields from this AppRecord. If there is no FieldList for this
record, this method returns null. Use is_var_null() to check for
null.`,meathodParms:[]},{meathodName:"GetDisplayName",meathodDescription:`inherited -> AppRecord
Returns the display name of a record.`,meathodReturn:"string",meathodReturnDescription:"This record's display name, formatted according to table settings.",meathodParms:[]},{meathodName:"GetFieldValue",meathodDescription:`inherited -> AppRecord
Gets the value of any field.`,meathodReturn:"Variant",meathodReturnDescription:`The internal value for a field or column.
For Text fields, this is the exact value entered in the field;
for selection fields, the value is the database ID for the
selection. For values that are not Variant or TimeT, this
internally gets the value from the field as a Variant, and
then tries to convert the value to the requested type.
TimeT can be used with Date/Time fields to get the
internal date value.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueString",meathodDescription:`inherited -> AppRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"string",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueInt",meathodDescription:`inherited -> AppRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"int",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueInt64",meathodDescription:`inherited -> AppRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"int64_t",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueDouble",meathodDescription:`inherited -> AppRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"double",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueTimeT",meathodDescription:`inherited -> AppRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"TimeT",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetId",meathodDescription:`inherited -> AppRecord
Retrieves the current AppRecord's TS_ID.`,meathodReturn:"int",meathodReturnDescription:"TS_ID of the calling AppRecord.",meathodParms:[]},{meathodName:"GetUUID",meathodDescription:`inherited -> AppRecord
Returns the item's UUID, if applicable.`,meathodReturn:"string",meathodReturnDescription:"The item's UUID.",meathodParms:[]},{meathodName:"GetName",meathodDescription:`inherited -> AppRecord
Gets the calling AppRecord's "Name" system field.`,meathodReturn:"string",meathodReturnDescription:"A text string from the associated Name field.",meathodParms:[]},{meathodName:"GetRecTableId",meathodDescription:`inherited -> AppRecord
Returns the calling AppRecord's table ID.`,meathodReturn:"int",meathodReturnDescription:"The calling AppRecord's table ID.",meathodParms:[]},{meathodName:"GetSchemaColumns",meathodDescription:`inherited -> AppRecord
Returns a Vector of SchemaColumn objects. Will not include fields for VarRecord or
ProjectBasedRecord objects.`,meathodReturn:"Vector",meathodReturnDescription:`Each entry will be a SchemaColumn object representing a column in
the database that this item can interact with.`,meathodParms:[]},{meathodName:"HasVariableDBFields",meathodDescription:`inherited -> AppRecord
Tests whether the calling AppRecord is from a table with variable fields.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the calling AppRecord's table has variable fields.",meathodParms:[]},{meathodName:"IsFieldEqual",meathodDescription:`inherited -> AppRecord
Tests for equivalence between the specified field and a value formatted as a string.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the field is found and is equal; false otherwise.",meathodParms:[{name:"fieldNameOrId",type:["int","string"],description:`If a non-numeric string, the name of the field to be tested.
Otherwise, it is converted to a number and taken as the
TS_ID of the field to be tested.`,optional:!1},{name:"value",type:"string",description:`The value to be compared to. The field's value will be
formatted as a string and compared to this value.`,optional:!1}]},{meathodName:"IsLocked",meathodDescription:`inherited -> AppRecord
Tests whether the calling AppRecord has been locked, meaning it is in use by another
user.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record is locked by another user.",meathodParms:[{name:"lockedByThisUser",type:"bool",description:`Without an input parameter ( or with "false" as the input ),
IsLocked() means "Does someone else have this record
locked?"
With "true" as the input parameter, the meaning is "May I
(as the current user) update this record?"`,optional:!0}]},{meathodName:"Lock",meathodDescription:`inherited -> AppRecord
Locks the calling AppRecord, so other users will not attempt
to update it.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record is locked by another user.",meathodParms:[{name:"stealLock",type:"bool",description:`Defaults to false, meaning if this item is already
locked, no lock will be established.
If true, any existing lock on this record will be broken, and
changes made by the former lock holder are lost.`,optional:!0}]},{meathodName:"Read",meathodDescription:`inherited -> AppRecord
Looks up a row in the AppRecord's table`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the TS_ID or name was found, in which case the
calling AppRecord object becomes a copy of that row in the table.`,meathodParms:[{name:"recordIdOrName",type:["int","string"],description:`If this is an int or string that SBM ModScript can convert to
an int, it is taken as the value to search for in the TS_ID
column. All other parameter types are converted to a string
and searched for in the Name system field.`,optional:!1}]},{meathodName:"ReadWithWhere",meathodDescription:`inherited -> AppRecord
Used to find a record by passing in a string containing a SQL
"where" clause, not including the keyword "where".`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the method found the record, in which case the calling
object becomes a copy of the record found. If more than one record
is found, the first one is copied to the calling object.`,meathodParms:[{name:"whereClause",type:"string",description:`The SQL "where" clause to find the specific record in the
table, not including the keyword "where".`,optional:!1},{name:"queryParams",type:"Vector",description:`queryParams is an optional Vector storing SQL bind
parameters, where each entry is a Pair, where the first value
is the parameter type and the second value is the value to
bind to the SQL parameter. See Pair, Map_Pair, and
Dictionary_Pair [page 123].
For the type parameter, use DBTypeConstants [page 347].`,optional:!0}]},{meathodName:"ReadByColumn",meathodDescription:`inherited -> AppRecord
Reads any record type by a column value`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the item is read successfully; false if the item is not
found.`,meathodParms:[{name:"columnName",type:"string",description:"The database name of the column without the TS_ prefix.",optional:!1},{name:"value",type:"Variant",description:`Behavior depends on the Variant internal type:
\u2022 string \u2013 ReadByColumn() will succeed if the column is a
text column.
\u2022 int, int64_t, short, byte, or bool \u2013 ReadByColumn() will
succeed if the column is an integer column.
\u2022 float or double \u2013 ReadByColumn() will succeed if the
column is a floating point column.`,optional:!1}]},{meathodName:"ReadByColumnAndColumn",meathodDescription:`inherited -> AppRecord
Reads any record type by two column values`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the item is read successfully; false if the item is not
found.`,meathodParms:[{name:"columnName",type:"string",description:'The name of the column without the "TS_" prefix',optional:!1},{name:"value",type:"Variant",description:`Value must be an int, int64_t, short, byte, bool, or string
that can be converted to an int.`,optional:!1},{name:"column2Name",type:"string",description:'The name of the second column without the "TS_" prefix.',optional:!1},{name:"value2",type:"Variant",description:`Behavior depends on the Variant internal type:
\u2022 string \u2013 ReadByColumn() will succeed if the column is a
text column.
\u2022 int, int64_t, short, byte, or bool \u2013 ReadByColumn() will
succeed if the column is an integer column.
\u2022 float or double \u2013 Not supported.`,optional:!1}]},{meathodName:"ReadByUUID",meathodDescription:`inherited -> AppRecord
Reads the item using the UUID column, if it exists.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the record was found, in which case the
calling AppRecord object becomes a copy of that row in the table.`,meathodParms:[{name:"itemUUID",type:"string",description:"The UUID value that is passed in.",optional:!1}]},{meathodName:"SetFieldValue",meathodDescription:`inherited -> AppRecord
Sets the value of any column.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the column value was successfully set; false
otherwise.`,meathodParms:[{name:"name",type:"string",description:`The name of the column whose value will be set in the
AppRecord schema.`,optional:!1},{name:"value",type:["int","string","int64_t","double","TimeT","Variant"],description:`The new value for the column. The value
must be specified as it is stored in the database. For
example, for integer columns that are a foreign key to the
TS_USERS table, the value must be the database ID for
the user. TimeT values should only be used with columns
that represent dates, either as a native database date or
as a integer that represents dates in Unix Epoch time
format.`,optional:!1}]},{meathodName:"SetName",meathodDescription:`inherited -> AppRecord
Sets the "name" value of the calling object.`,meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"newName",type:"string",description:"Text to be used as the new name for the item.",optional:!1}]},{meathodName:"Unlock",meathodDescription:`inherited -> AppRecord
Unlocks the calling AppRecord, signaling that it is available
for other users.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the record was successfully unlocked or was not
locked to begin with.`,meathodParms:[{name:"currentUserOnly",type:"bool",description:`Defaults to false. If true, only the current user's
lock is unlocked. If false, any user's lock on this record is
removed.`,optional:!0}]},{meathodName:"Update",meathodDescription:`inherited -> AppRecord
This method updates the item in the database using the
values from the item.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record is updated in the database.",meathodParms:[]},{meathodName:"UpdateWithLock",meathodDescription:`inherited -> AppRecord
Updates the record that has been previously locked with
Lock() function.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record was successfully updated; false otherwise.",meathodParms:[{name:"stealLock",type:"bool",description:`Optional parameter that allows the user to skip the Lock()
function and steal the lock during the update. Defaults to
false. If true, any other user's existing lock will be broken,
causing that user's changes to be lost.`,optional:!0}]}],inheritsDone:!0},FolderItemList:{className:"FolderItemList",exposed:!1,inheritsFrom:"AppRecordList",classDescription:`A FolderItemList is an AppRecordList that holds objects of type FolderItem. Typically, the
ReadWithWhere() method is used to fill the list with all items from a given folder.`,meathods:[{meathodName:"Contains",meathodDescription:"Used to determine whether a folder contains an item.",meathodReturn:"bool",meathodReturnDescription:"Returns true if the item is found in the list.",meathodParms:[{name:"tableId",type:"int",description:"Table ID of the item to search for.",optional:!1},{name:"recId",type:"int",description:"TS_ID of the item to search for.",optional:!1}]},{meathodName:"Count",meathodDescription:`inherited -> AppRecordList
Returns the number of items in the list.`,meathodReturn:"int",meathodReturnDescription:"The number of items in the list.",meathodParms:[]},{meathodName:"DeleteRecord",meathodDescription:`inherited -> AppRecordList
Removes the specified record from the list.`,meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"recordId",type:"int",description:"The TS_ID of the record to delete from the list.",optional:!1}]},{meathodName:"FindRecord",meathodDescription:`inherited -> AppRecordList
Find a specific record in the current list by matching its name or TS_ID.`,meathodReturn:"AppRecord",meathodReturnDescription:`The first AppRecord in the list that matches the given name or ID. If
there is no match, returns null. Use is_var_null() to check for null.`,meathodParms:[{name:"recordIdOrName",type:"Variant",description:`If this parameter is a non-numeric string, it is taken as
the desired record's name. Otherwise, it is converted to
an integer and taken as the desired record's TS_ID.`,optional:!1}]},{meathodName:"Length",meathodDescription:`inherited -> AppRecordList
Returns the number of items in the list.`,meathodReturn:"int",meathodReturnDescription:"The number of items in the list.",meathodParms:[]},{meathodName:"Read",meathodDescription:`inherited -> AppRecordList
Fills the AppRecordList from its table.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if successful; false otherwise. A successful read may
return zero results if no items match the query. Check for results by
calling the AppRecordList.empty() method.`,meathodParms:[]},{meathodName:"ReadByColumn",meathodDescription:`inherited -> AppRecordList
Reads any record list type by a column value`,meathodReturn:"bool",meathodReturnDescription:`Returns true if successful; false otherwise. A successful read may
return zero results if no items match the query. Check for results by
calling the AppRecordList.empty() method.`,meathodParms:[{name:"columnName",type:"string",description:'The name of the column without the "TS_" prefix.',optional:!1},{name:"value",type:"Variant",description:`Behavior depends on the Variant internal type:
\u2022 string \u2013 ReadByColumn() will succeed if the column is a
text column.
\u2022 int, int64_t, short, byte, or bool \u2013 ReadByColumn() will
succeed if the column is an integer column.
\u2022 float or double \u2013 ReadByColumn() will succeed if the
column is a floating point column.`,optional:!1}]},{meathodName:"ReadByColumnAndColumn",meathodDescription:`inherited -> AppRecordList
Reads any record list type by two column values.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if successful; false otherwise. A successful read may
return zero results if no items match the query. Check for results by
calling the AppRecordList.empty() method.`,meathodParms:[{name:"columnName",type:"string",description:'The name of the column without the "TS_" prefix',optional:!1},{name:"value",type:"Variant",description:`Value must be an int, int64_t, short, byte, bool, or string
that can be converted to an int.`,optional:!1},{name:"column2Name",type:"string",description:'The name of the second column without the "TS_" prefix.',optional:!1},{name:"value2",type:"Variant",description:`Behavior depends on the Variant internal type:
\u2022 string \u2013 ReadByColumn() will succeed if the column is a
text column.
\u2022 int, int64_t, short, byte, or bool \u2013 ReadByColumn() will
succeed if the column is an integer column.
\u2022 float or double \u2013 Not supported.`,optional:!1}]},{meathodName:"ReadWithWhere",meathodDescription:`inherited -> AppRecordList
An alternative to Read(), this method uses SQL to select
only certain records from the calling AppRecordList's table, rather than reading the entire
table.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if successful; false otherwise. A successful read may
return zero results if no items match the query. Check for results by
calling the AppRecordList.empty() method.`,meathodParms:[{name:"whereClause",type:"string",description:`A SQL "where clause" specifying the records to find. SBM
will build a SQL string requesting all fields for the calling
AppRecordList's table. The string contents of
whereClause will appear after the word "where" in this
SQL statement.`,optional:!1},{name:"params",type:"Vector",description:`Params is an optional Vector storing SQL bind
parameters, where each entry is a Pair, with the first
value as the parameter type and the second value as the
value to bind to the SQL parameter. See Pair, Map_Pair,
and Dictionary_Pair [page 123].
For the type parameter, use DBTypeConstants [page
347].`,optional:!0},{name:"orderBy",type:"string",description:`Identifies a column used for ordering the AppRecordList.
To use the templateRec parameter without the orderBy
parameter, use an empty string as a parameter for the
orderBy parameter.`,optional:!0},{name:"templateRec",type:"AppRecord",description:`Optional. Identifies which fields are read into all
AppRecords in the AppRecordList. Using this parameter
may improve performance when using AppRecordOjbects
which contain a VarFieldList from Primary or Auxiliary
tables.
To use this optional parameter, create a VarRecord
against the Primary table you are doing your
ReadWithWhere against. Get the VarFieldList of that
VarRecord through the Fields() method. Call SelectAll,
and pass it false to clear all fields. Then, explicitly turn
on the fields you wish to read by finding the Field on the
VarFieldList, and then calling that Field's Select() method
and passing it true.`,optional:!0}]},{meathodName:"clear",meathodDescription:`inherited -> AppRecordList
Removes all records from the list.`,meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[]},{meathodName:"empty",meathodDescription:`inherited -> AppRecordList
Returns true if the list is empty.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the list is empty; false if there are items in the list.",meathodParms:[]},{meathodName:"erase_at",meathodDescription:`inherited -> AppRecordList
Removes the item at specified index from the list.`,meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"index",type:"int",description:"The zero-based index of the item to remove from the list.",optional:!1}]},{meathodName:"size",meathodDescription:`inherited -> AppRecordList
Returns the number of items in the list`,meathodReturn:"size_t",meathodReturnDescription:"The number of items in the list.",meathodParms:[]},{meathodName:"Update",meathodDescription:`inherited -> AppRecordList
Perform a database update on all records in the list.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if all applicable records are successfully updated; false
otherwise.`,meathodParms:[]}],properties:[],inheritsDone:!0},Free_Functions:{className:"",exposed:!0,inheritsFrom:"",classDescription:"",meathods:[{meathodName:"CreateObject",meathodDescription:"Creates a Lib or Dictionary object.",meathodReturn:"Variant",meathodReturnDescription:"Returns a Variant wrapping the desired object.",meathodParms:[{name:"value",type:"string",description:`A string that represents the type of object to create.
\u2022 To create a Lib object, use "SBMLibrary". See Lib [page
227].
\u2022 To create a Dictionary object, use "Scripting.Dictionary".
See Dictionary [page 207].`,optional:!1}]},{meathodName:"CreateLocale",meathodDescription:'Creates a specified locale, such as "en_US".',meathodReturn:"Locale",meathodReturnDescription:"Returns a Locale.",meathodParms:[{name:"value",type:"string",description:"A string that specifies the locale.",optional:!1}]},{meathodName:"CreateUserLocale",meathodDescription:"Returns the current user's locale.",meathodReturn:"Locale",meathodReturnDescription:`The current user's locale that is specified in the user profile. If the
user does not have a specified locale in his or her profile, the system
locale is returned.`,meathodParms:[]},{meathodName:"CreateSystemLocale",meathodDescription:"Returns the default locale for the system.",meathodReturn:"Locale",meathodReturnDescription:`The current system locale. This is the default locale, configured in
SBM System Administrator, which is used as the default locale for
users who do not have one specified.`,meathodParms:[]},{meathodName:"CreateTimeZone",meathodDescription:"Creates the specified TimeZone.",meathodReturn:"TimeZone",meathodReturnDescription:"The specified TimeZone.",meathodParms:[{name:"value",type:"string",description:`A string that specifies the TimeZone, such as "MST",
"America/Denver", "US/Mountain".`,optional:!1}]},{meathodName:"CreateUserTimeZone",meathodDescription:"Returns the current user's TimeZone",meathodReturn:"TimeZone",meathodReturnDescription:`The user's current TimeZone that is set in the user profile. If not
specified, the system TimeZone is used.`,meathodParms:[]},{meathodName:"CreateUTCTimeZone",meathodDescription:"Returns a TimeZone set to Coordinated Universal Time (UTC).",meathodReturn:"TimeZone",meathodReturnDescription:"The UTC TimeZone.",meathodParms:[]},{meathodName:"ExitScript",meathodDescription:"Gracefully exits the script from wherever it is invoked.",meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[]},{meathodName:"include",meathodDescription:"Used to include scripts within other scripts",meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"value",type:"string",description:"The name of the script to include.",optional:!1}]},{meathodName:"ScriptEngine",meathodDescription:'Returns "ChaiScript"',meathodReturn:"string",meathodReturnDescription:'Returns "ChaiScript"',meathodParms:[]},{meathodName:"ScriptEngineVersion",meathodDescription:"Returns the ChaiScript version number.",meathodReturn:"string",meathodReturnDescription:"Returns the ChaiScript version number.",meathodParms:[]},{meathodName:"ScriptEngineMajorVersion",meathodDescription:"Returns the ChaiScript major version number.",meathodReturn:"int",meathodReturnDescription:'Returns "ChaiScript"',meathodParms:[]},{meathodName:"ScriptEngineMinorVersion",meathodDescription:"Returns the ChaiScript minor version number.",meathodReturn:"int",meathodReturnDescription:"Returns the ChaiScript minor version number.",meathodParms:[]},{meathodName:"ScriptEngineBuildVersion",meathodDescription:"Returns SBM version.",meathodReturn:"string",meathodReturnDescription:"Returns SBM version.",meathodParms:[]},{meathodName:"TimeMillisDate",meathodDescription:"Returns a TimeMillis set to current date (time truncated to midnight UTC).",meathodReturn:"TimeMillis",meathodReturnDescription:"The current date (with the time truncated to midnight UTC).",meathodParms:[]},{meathodName:"TimeMillisNow",meathodDescription:"Returns a TimeMillis set to current time.",meathodReturn:"TimeMillis",meathodReturnDescription:"The current date/time with millisecond precision.",meathodParms:[]},{meathodName:"TimeTDate",meathodDescription:"Returns a TimeT set to current date (time truncated to midnight UTC).",meathodReturn:"TimeT",meathodReturnDescription:"The current date (with the time truncated to midnight UTC).",meathodParms:[]},{meathodName:"TimeTNow",meathodDescription:"Returns a TimeT set to current time.",meathodReturn:"TimeT",meathodReturnDescription:"The current date/time.",meathodParms:[]}],properties:[]},Free_Functions_AppScript_Conversion:{className:"",exposed:!0,inheritsFrom:"",classDescription:"",meathods:[],properties:[]},Free_Functions_Constructors:{className:"",exposed:!0,inheritsFrom:"",classDescription:"",meathods:[{meathodName:"Dictionary",meathodDescription:"Creates a dictionary object.",meathodReturn:"Dictionary",meathodReturnDescription:"A new Dictionary Object",meathodParms:[]},{meathodName:"Map",meathodDescription:"Creates a map object.",meathodReturn:"Map",meathodReturnDescription:"A new Map Object",meathodParms:[{name:"m",type:"Map",description:"If a map is passed in, constructer returns a copy of m.",optional:!0}]},{meathodName:"Map_Pair",meathodDescription:"Creates a Map_Pair object.",meathodReturn:"Map_Pair",meathodReturnDescription:"A new Map_Pair Object",meathodParms:[{name:"first",type:["Map_Pair","Variant"],description:"If a Map_Pair is passed in, constructer returns a copy of mp, else you can pass two variables to create a new Map_Pair Object.",optional:!0},{name:"second",type:"Variant",description:"The second value in a Map_Pair, used to initlilize a new Map_Pair",optional:!0}]},{meathodName:"Pair",meathodDescription:"Creates a Pair object.",meathodReturn:"Pair",meathodReturnDescription:"A new Pair Object",meathodParms:[{name:"first",type:["Pair","Variant"],description:"If a Pair is passed in, constructer returns a copy of first, else you can pass two variables to create a new Pair Object.",optional:!0},{name:"second",type:"Variant",description:"The second value in a pair, used to initlilize a new Pair",optional:!0}]},{meathodName:"Dictionary_Pair",meathodDescription:"Creates a Dictionary_Pair object.",meathodReturn:"Dictionary_Pair",meathodReturnDescription:"A new Dictionary_Pair Object",meathodParms:[{name:"first",type:["Dictionary_Pair","Variant"],description:"If a Dictionary_Pair is passed in, constructer returns a copy of first, else you can pass two variables to create a new Dictionary_Pair Object.",optional:!0},{name:"second",type:"Variant",description:"The second value in a Dictionary_Pair, used to initlilize a new Dictionary_Pair",optional:!0}]},{meathodName:"string",meathodDescription:"Creates a string object.",meathodReturn:"string",meathodReturnDescription:"A new string Object",meathodParms:[{name:"s",type:"string",description:"If a string is passed in, constructer returns a copy of s.",optional:!0}]},{meathodName:"u32string",meathodDescription:"Creates a u32string object.",meathodReturn:"u32string",meathodReturnDescription:"A new u32string Object",meathodParms:[{name:"s",type:"u32string",description:"If a u32string is passed in, constructer returns a copy of s.",optional:!0}]},{meathodName:"Vector",meathodDescription:"Creates a Vector object.",meathodReturn:"Vector",meathodReturnDescription:"A new Vector Object",meathodParms:[{name:"v",type:"Vector",description:"If a Vector is passed in, constructer returns a copy of v.",optional:!0}]},{meathodName:"SQLColumnDef",meathodDescription:"Creates a SQLColumnDef object.",meathodReturn:"Log",meathodReturnDescription:"A new SQLColumnDef Object",meathodParms:[{name:"dbType",type:"DBTypeConstants",description:"If first 2 params passed in creates a SQLColumnDef object and populates members.",optional:!0},{name:"name",type:"string",description:"If first 2 params passed in creates a SQLColumnDef object and populates members.",optional:!0},{name:"hint",type:"SQLColumnDefOutputHint",description:"Optional hint if passing in params.",optional:!0}]},{meathodName:"TempFile",meathodDescription:"Creates a TempFile object.",meathodReturn:"TempFile",meathodReturnDescription:"A new TempFile Object",meathodParms:[]},{meathodName:"TimeMillis",meathodDescription:"Creates a TimeMillis object.",meathodReturn:"TimeMillis",meathodReturnDescription:"A new TimeMillis Object",meathodParms:[{name:"time",type:["int","TimeT"],description:"If parm passed creates a TimeMillis with date equal to time param, can be of type int or TimeT.",optional:!0}]},{meathodName:"TimePoint",meathodDescription:"Creates a TimePoint object.",meathodReturn:"TimePoint",meathodReturnDescription:"A new TimePoint Object",meathodParms:[{name:"v",type:["TimePoint","TimeZone","TimeMillis"],description:`Passing no value Creates a TimePoint populated with the current moment in time and
UTC timezone.
Passing TimePoint Creates a TimePoint copying the values from "v"
Passing TimeZone  Creates a TimePoint populated with the current
moment in time and uses "tz" as the timezone.
Passing TimeMillis Creates a TimePoint populated with the
moment in time from "v" and uses "tz" as the timezone. TimeT can implicitly convert
to a TimeMillis, allowing this function to be used with TimeT values as well.
If Passing TimeMillis, Second Parm required.`,optional:!0},{name:"tz",type:"TimeZone",description:"Required if first Param is TimeMillis.",optional:!0}]},{meathodName:"TimeT",meathodDescription:"Creates a TimeT object.",meathodReturn:"TimeT",meathodReturnDescription:"A new TimeT Object",meathodParms:[{name:"seconds",type:"int",description:"Creates a TimeT with date equal to seconds.",optional:!0}]},{meathodName:"Variant",meathodDescription:"Creates a Variant object.",meathodReturn:"Variant",meathodReturnDescription:"A new Variant Object",meathodParms:[{name:"v",type:["Variant","bool","double","short","int","int64_t","uint64_t","string"],description:"A new Variant Object with internal value of v",optional:!0}]},{meathodName:"Regex",meathodDescription:"Creates a Regex object.",meathodReturn:"Regex",meathodReturnDescription:"A new Regex Object",meathodParms:[]}],properties:[]},Free_Functions_Math:{className:"",exposed:!0,inheritsFrom:"",classDescription:"",meathods:[{meathodName:"abs",meathodDescription:"Math Function: abs",meathodReturn:"double",meathodReturnDescription:"double",meathodParms:[{name:"arg",type:"double",description:"double",optional:!1}]},{meathodName:"fabs",meathodDescription:"Math Function: fabs",meathodReturn:"double",meathodReturnDescription:"double",meathodParms:[{name:"arg",type:"double",description:"double",optional:!1}]},{meathodName:"fmod",meathodDescription:"Math Function: fmod",meathodReturn:"double",meathodReturnDescription:"double",meathodParms:[{name:"arg1",type:"double",description:"double",optional:!1},{name:"arg2",type:"double",description:"double",optional:!1}]},{meathodName:"remainder",meathodDescription:"Math Function: remainder",meathodReturn:"double",meathodReturnDescription:"double",meathodParms:[{name:"arg1",type:"double",description:"double",optional:!1},{name:"arg2",type:"double",description:"double",optional:!1}]},{meathodName:"remquo",meathodDescription:"Math Function: remquo",meathodReturn:"double",meathodReturnDescription:"double",meathodParms:[{name:"arg1",type:"double",description:"double",optional:!1},{name:"arg2",type:"double",description:"double",optional:!1},{name:"arg3",type:"int",description:"int",optional:!1}]},{meathodName:"fdim",meathodDescription:"Math Function: fdim",meathodReturn:"double",meathodReturnDescription:"double",meathodParms:[{name:"arg1",type:"double",description:"double",optional:!1},{name:"arg2",type:"double",description:"double",optional:!1}]},{meathodName:"fma",meathodDescription:"Math Function: fma",meathodReturn:"double",meathodReturnDescription:"double",meathodParms:[{name:"arg1",type:"double",description:"double",optional:!1},{name:"arg2",type:"double",description:"double",optional:!1}]},{meathodName:"fma",meathodDescription:"Math Function: fma",meathodReturn:"double",meathodReturnDescription:"double",meathodParms:[{name:"arg1",type:"double",description:"double",optional:!1},{name:"arg2",type:"double",description:"double",optional:!1},{name:"arg3",type:"double",description:"double",optional:!1}]},{meathodName:"fmax",meathodDescription:"Math Function: fmax",meathodReturn:"double",meathodReturnDescription:"double",meathodParms:[{name:"arg1",type:"double",description:"double",optional:!1},{name:"arg2",type:"double",description:"double",optional:!1}]},{meathodName:"fmin",meathodDescription:"Math Function: fmin",meathodReturn:"double",meathodReturnDescription:"double",meathodParms:[{name:"arg1",type:"double",description:"double",optional:!1},{name:"arg2",type:"double",description:"double",optional:!1}]},{meathodName:"nan",meathodDescription:"Math Function: nan",meathodReturn:"double",meathodReturnDescription:"double",meathodParms:[{name:"arg",type:"string",description:"string",optional:!1}]},{meathodName:"ceil",meathodDescription:"Math Function: ceil",meathodReturn:"double",meathodReturnDescription:"double",meathodParms:[{name:"arg",type:"double",description:"double",optional:!1}]},{meathodName:"floor",meathodDescription:"Math Function: floor",meathodReturn:"double",meathodReturnDescription:"double",meathodParms:[{name:"arg",type:"double",description:"double",optional:!1}]},{meathodName:"trunc",meathodDescription:"Math Function: trunc",meathodReturn:"double",meathodReturnDescription:"double",meathodParms:[{name:"arg",type:"double",description:"double",optional:!1}]},{meathodName:"round",meathodDescription:"Math Function: round",meathodReturn:"double",meathodReturnDescription:"double",meathodParms:[{name:"arg",type:"double",description:"double",optional:!1}]},{meathodName:"lround",meathodDescription:"Math Function: lround",meathodReturn:"int",meathodReturnDescription:"int",meathodParms:[{name:"arg",type:"double",description:"double",optional:!1}]},{meathodName:"llround",meathodDescription:"Math Function: llround",meathodReturn:"int64_t",meathodReturnDescription:"int64_t",meathodParms:[{name:"arg",type:"double",description:"double",optional:!1}]},{meathodName:"rint",meathodDescription:"Math Function: rint",meathodReturn:"double",meathodReturnDescription:"double",meathodParms:[{name:"arg",type:"double",description:"double",optional:!1}]},{meathodName:"lrint",meathodDescription:"Math Function: lrint",meathodReturn:"int",meathodReturnDescription:"int",meathodParms:[{name:"arg",type:"double",description:"double",optional:!1}]},{meathodName:"llrint",meathodDescription:"Math Function: llrint",meathodReturn:"int64_t",meathodReturnDescription:"int64_t",meathodParms:[{name:"arg",type:"double",description:"double",optional:!1}]},{meathodName:"nearbyint",meathodDescription:"Math Function: nearbyint",meathodReturn:"double",meathodReturnDescription:"double",meathodParms:[{name:"arg",type:"double",description:"double",optional:!1}]}],properties:[]},Incident:{className:"Incident",exposed:!1,inheritsFrom:"ProjectBasedRecord",classDescription:`Not commonly used, as this maps to a specific primary table that may not exist in your
database.
An incident is simply a ProjectBasedRecord from the Incident Management application's
primary table. Objects of type incident can be created using CreateObject(), and SBM will
automatically look up the Incidents table.`,meathods:[{meathodName:"GetProjectId",meathodDescription:`inherited -> ProjectBasedRecord
Identifies the calling record's project.`,meathodReturn:"int",meathodReturnDescription:"TS_ID of the calling record's project.",meathodParms:[]},{meathodName:"StartSubmitToProject",meathodDescription:`inherited -> ProjectBasedRecord
Starts a submit transition for an item using a project ID,
				project UUID, or project internal name.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if transition was started. If false, use
				Shell.GetLastErrorMessage() for more information`,meathodParms:[{name:"project",type:["int","string"],description:"Can be project ID, project UUID, or project internal name.",optional:!1}]},{meathodName:"StartSubmitToProjectUsingTransition",meathodDescription:`inherited -> ProjectBasedRecord
Starts a submit transition for an item, specifying the project
and transition to use.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if transition was started. If false, use
Shell.GetLastErrorMessage() for more information.`,meathodParms:[{name:"project",type:["int","string"],description:"Can be project ID, project UUID, or project internal name.",optional:!1},{name:"trans",type:["int","string"],description:`Can be transition ID, transition UUID, or transition internal
name.`,optional:!1}]},{meathodName:"FinishSubmitToProject",meathodDescription:`inherited -> ProjectBasedRecord
Finishes a submit transition for an item.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if transition completed successfully. If false, use
Shell.GetLastErrorMessage() for more information.`,meathodParms:[{name:"signedUserID",type:"string",description:`Optional. Provides the user name portion of the signature if
the transition requires a user's signature.`,optional:!0},{name:"signedUserPwd",type:"string",description:`Optional, required if signedUserID is provided. Provides the
password portion of the signature if the transition requires a
user's signature.`,optional:!0}]},{meathodName:"FinishSubmitToProjectUsingTransition",meathodDescription:`inherited -> ProjectBasedRecord
Finish a submit transition for an item using a non-default
transition.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if transition completed successfully. If false, use
Shell.GetLastErrorMessage() for more information.`,meathodParms:[{name:"trans",type:["int","string"],description:`Can be transition ID, transition UUID, or transition internal
name.`,optional:!1},{name:"signedUserID",type:"string",description:`Optional. Provides the user name portion of the signature if
the transition requires a user's signature.`,optional:!0},{name:"signedUserPwd",type:"string",description:`Optional, required if signedUserID is provided. Provides the
password portion of the signature if the transition requires a
user's signature.`,optional:!0}]},{meathodName:"QuickSubmitToProject",meathodDescription:`inherited -> ProjectBasedRecord
 Identical to FinishSubmitToProject() except
StartSubmitToProject() is not required, and thus, the project must be specified.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if transition completed successfully. If false, use
Shell.GetLastErrorMessage() for more information.`,meathodParms:[{name:"project",type:["int","string"],description:"Can be project ID, project UUID, or project internal name.",optional:!1},{name:"signedUserID",type:"string",description:`Optional. Provides the user name portion of the signature if
the transition requires a user's signature.`,optional:!0},{name:"signedUserPwd",type:"string",description:`Optional, required if signedUserID is provided. Provides the
password portion of the signature if the transition requires a
user's signature.`,optional:!0}]},{meathodName:"QuickSubmitToProjectUsingTransition",meathodDescription:`inherited -> ProjectBasedRecord
Identical to FinishSubmitToProjectUsingTransition() except
StartSubmitToProjectUsingTransition() is not required, and thus, the project must be
specified.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if transition completed successfully. If false, use
Shell.GetLastErrorMessage() for more information.`,meathodParms:[{name:"project",type:["int","string"],description:"Can be project ID, project UUID, or project internal name.",optional:!1},{name:"trans",type:["int","string"],description:`Can be transition ID, transition UUID, or transition internal
name.`,optional:!1},{name:"signedUserID",type:"string",description:`Optional. Provides the user name portion of the signature if
the transition requires a user's signature.`,optional:!0},{name:"signedUserPwd",type:"string",description:`Optional, required if signedUserID is provided. Provides the
password portion of the signature if the transition requires a
user's signature.`,optional:!0}]},{meathodName:"GetDisplayIssueId",meathodDescription:`inherited -> VarRecord -> ProjectBasedRecord
Returns the item's display ID, consisting of a prefix indicating the item's type and a serial
number within the item's project.`,meathodReturn:"string",meathodReturnDescription:"The item's display ID.",meathodParms:[]},{meathodName:"GetFieldValue",meathodDescription:`inherited -> VarRecord -> ProjectBasedRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"Variant",meathodReturnDescription:`The internal value for the field. For Text fields,
this is the exact value entered in the field. For values that
are not Variant or TimeT, this internally gets the value
from the field as a Variant, and then tries to convert the
value to the requested type.
TimeT can be used with Date/Time fields to get the
internal date value.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the calling record's variable field list.
Field names for variable fields should be provided in upper
case for database names (TITLE, for example) or in lower/
mixed-case for display names (Title, for example). For
details on working with different types of database fields,
refer to Working with SBM Database Fields [page 39].`,optional:!1}]},{meathodName:"GetItemNumber",meathodDescription:`inherited -> VarRecord -> ProjectBasedRecord
Returns the numeric portion of the item's display ID.`,meathodReturn:"int",meathodReturnDescription:"The item's display ID.",meathodParms:[]},{meathodName:"GetItemPrefix",meathodDescription:`inherited -> VarRecord -> ProjectBasedRecord
Returns the prefix of the item's display ID, indicating the item's type. Item types and their
prefixes are defined when an SBM designer configures a workflow.`,meathodReturn:"string",meathodReturnDescription:"The prefix of the item's display ID.",meathodParms:[]},{meathodName:"GetStateId",meathodDescription:`inherited -> VarRecord -> ProjectBasedRecord
Identifies the calling record's state within a workflow.`,meathodReturn:"int",meathodReturnDescription:`TS_ID of the record's state within the item's workflow. If the record
is not from a primary table, then it does not have a workflow and the
return value is -1.`,meathodParms:[]},{meathodName:"SetFieldValue",meathodDescription:`inherited -> VarRecord -> ProjectBasedRecord
Sets the value of any column.`,meathodReturn:"bool",meathodReturnDescription:"True if the field was changed.",meathodParms:[{name:"name",type:"string",description:`The name of the column whose value will be set in the
AppRecord schema.`,optional:!1},{name:"recordIdOrName",type:["int","string","int64_t","double","TimeT","Variant"],description:`The new value for the column. The value
must be specified as it is stored in the database. For
example, for integer columns that are a foreign key to the
TS_USERS table, the value must be the database ID for
the user. TimeT values should only be used with columns
that represent dates, either as a native database date or
as a integer that represents dates in Unix Epoch time
format.`,optional:!1},{name:"fieldList",type:"Variant",description:`Optional. If supplied and equal to the global
constant Nothing, this parameter will refer to the calling
record's VarFieldList when this method returns. If supplied
and not equal to Nothing, this parameter is taken to be the
calling record's VarFieldList.
Do not set this parameter's value yourself. Always pass a
variable set to Nothing and then reuse the variable for
subsequent calls to GetFieldValue() and SetFieldValue() on
the same VarRecord object. If this parameter is omitted,
no functionality changes, but efficiency may suffer.`,optional:!0},{name:"field",type:"Variant",description:`Optional. If supplied and equal to the global
constant Nothing, this parameter will refer to the Field
object on the calling record's VarFieldList whose name
matches the name input parameter when this method
returns. If supplied and not equal to Nothing, this
parameter is taken to be that Field object.`,optional:!0}]},{meathodName:"StartTransition",meathodDescription:`inherited -> VarRecord -> ProjectBasedRecord
Starts a transition on an item.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if transition was started. If false, use
Shell.GetLastErrorMessage() for more information.`,meathodParms:[{name:"trans",type:"Variant",description:`Can be transition ID, 0 (will use default Update transition
for item), transition UUID, or transition internal name.`,optional:!1},{name:"stealLock",type:"bool",description:`If true, any item lock on this item will be stolen by
this transition. If it was locked, the user who had the item
locked (in transition) will not be able to complete their
transition. Does not guarantee that the transition succeeds,
as scripts can steal locks from each other.`,optional:!0}]},{meathodName:"StartTransitionWithLock",meathodDescription:`inherited -> VarRecord -> ProjectBasedRecord
 Identical to StartTransition(), assumes AppRecord.Lock()
has been invoked.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if transition was started. If false, use
Shell.GetLastErrorMessage() for more information.`,meathodParms:[{name:"trans",type:"Variant",description:`Can be transition ID, 0 (will use default Update transition
for item), transition UUID, or transition internal name.`,optional:!1},{name:"stealLock",type:"bool",description:`If true, any item lock on this item will be stolen by
this transition. If it was locked, the user who had the item
locked (in transition) will not be able to complete their
transition. Does not guarantee that the transition succeeds,
as scripts can steal locks from each other.`,optional:!0}]},{meathodName:"FinishTransition",meathodDescription:`inherited -> VarRecord -> ProjectBasedRecord
Finishes a transition on an item after StartTransition() has
been invoked and field values have been set.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if transition completed successfully. If false, use
Shell.GetLastErrorMessage() for more information.`,meathodParms:[{name:"trans",type:"Variant",description:`Can be transition ID, 0 (will use default Update transition
for item), transition UUID, or transition internal name.`,optional:!1},{name:"stealLock",type:"bool",description:`If true, any item lock on this item will be stolen by
this transition. If it was locked, the user who had the item
locked (in transition) will not be able to complete their
transition. Does not guarantee that the transition succeeds,
as scripts can steal locks from each other.`,optional:!0},{name:"signedUserID",type:"string",description:`Optional. Provides the user name portion of the signature if
the transition requires a user's signature.`,optional:!0},{name:"signedUserPwd",type:"string",description:`Optional, required if signedUserID is provided. Provides the
password portion of the signature if the transition requires a
user's signature.`,optional:!0}]},{meathodName:"QuickTransition",meathodDescription:`inherited -> VarRecord -> ProjectBasedRecord
Identical to FinishTransition() except that StartTransition() is
not required.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if transition completed successfully. If false, use
Shell.GetLastErrorMessage() for more information.`,meathodParms:[{name:"trans",type:"Variant",description:`Can be transition ID, 0 (will use default Update transition
for item), transition UUID, or transition internal name.`,optional:!1},{name:"stealLock",type:"bool",description:`If true, any item lock on this item will be stolen by
this transition. If it was locked, the user who had the item
locked (in transition) will not be able to complete their
transition. Does not guarantee that the transition succeeds,
as scripts can steal locks from each other.`,optional:!0},{name:"signedUserID",type:"string",description:`Optional. Provides the user name portion of the signature if
the transition requires a user's signature.`,optional:!0},{name:"signedUserPwd",type:"string",description:`Optional, required if signedUserID is provided. Provides the
password portion of the signature if the transition requires a
user's signature.`,optional:!0}]},{meathodName:"StartSubmitToAux",meathodDescription:`inherited -> VarRecord -> ProjectBasedRecord
Starts the submit of a new item into an auxiliary table.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if transition completed successfully. If false, use
Shell.GetLastErrorMessage() for more information.`,meathodParms:[]},{meathodName:"FinishSubmitToAux",meathodDescription:`inherited -> VarRecord -> ProjectBasedRecord
Finishes the submit into an auxiliary table.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if transition completed successfully. If false, use
Shell.GetLastErrorMessage() for more information.`,meathodParms:[]},{meathodName:"QuickSubmitToAux",meathodDescription:`inherited -> VarRecord -> ProjectBasedRecord
Identical to FinishSubmitToAux except StartSubmitToAux is
not required.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if transition completed successfully. If false, use
Shell.GetLastErrorMessage() for more information.`,meathodParms:[]},{meathodName:"Add",meathodDescription:`inherited -> AppRecord -> VarRecord -> ProjectBasedRecord
This method adds a new row to a table. After creating an AppRecord from
the desired table and setting any desired field values, use this method to add the
record as a new row in its table. This is not for use with Primary tables, because
those items must go through a Submit transition. However, it is possible to make a
copy of a Primary table item using this method.`,meathodReturn:"int",meathodReturnDescription:`The TS_ID of the record added, which is unique to this table.
Zero means the record could not be added due to an error.`,meathodParms:[]},{meathodName:"Delete",meathodDescription:`inherited -> AppRecord -> VarRecord -> ProjectBasedRecord
On most tables, this method removes the record from the database. On
tables such as States and Users, the records are marked as deleted but remain in
the database.`,meathodReturn:"bool",meathodReturnDescription:`True if the record is deleted from or marked as deleted in the
database.`,meathodParms:[]},{meathodName:"Fields",meathodDescription:`inherited -> AppRecord -> VarRecord -> ProjectBasedRecord
Returns a VarFieldList containing all fields for a VarRecord.`,meathodReturn:"VarFieldList",meathodReturnDescription:`The list of fields from this AppRecord. If there is no FieldList for this
record, this method returns null. Use is_var_null() to check for
null.`,meathodParms:[]},{meathodName:"GetDisplayName",meathodDescription:`inherited -> AppRecord -> VarRecord -> ProjectBasedRecord
Returns the display name of a record.`,meathodReturn:"string",meathodReturnDescription:"This record's display name, formatted according to table settings.",meathodParms:[]},{meathodName:"GetFieldValueString",meathodDescription:`inherited -> AppRecord -> VarRecord -> ProjectBasedRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"string",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueInt",meathodDescription:`inherited -> AppRecord -> VarRecord -> ProjectBasedRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"int",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueInt64",meathodDescription:`inherited -> AppRecord -> VarRecord -> ProjectBasedRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"int64_t",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueDouble",meathodDescription:`inherited -> AppRecord -> VarRecord -> ProjectBasedRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"double",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueTimeT",meathodDescription:`inherited -> AppRecord -> VarRecord -> ProjectBasedRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"TimeT",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetId",meathodDescription:`inherited -> AppRecord -> VarRecord -> ProjectBasedRecord
Retrieves the current AppRecord's TS_ID.`,meathodReturn:"int",meathodReturnDescription:"TS_ID of the calling AppRecord.",meathodParms:[]},{meathodName:"GetUUID",meathodDescription:`inherited -> AppRecord -> VarRecord -> ProjectBasedRecord
Returns the item's UUID, if applicable.`,meathodReturn:"string",meathodReturnDescription:"The item's UUID.",meathodParms:[]},{meathodName:"GetName",meathodDescription:`inherited -> AppRecord -> VarRecord -> ProjectBasedRecord
Gets the calling AppRecord's "Name" system field.`,meathodReturn:"string",meathodReturnDescription:"A text string from the associated Name field.",meathodParms:[]},{meathodName:"GetRecTableId",meathodDescription:`inherited -> AppRecord -> VarRecord -> ProjectBasedRecord
Returns the calling AppRecord's table ID.`,meathodReturn:"int",meathodReturnDescription:"The calling AppRecord's table ID.",meathodParms:[]},{meathodName:"GetSchemaColumns",meathodDescription:`inherited -> AppRecord -> VarRecord -> ProjectBasedRecord
Returns a Vector of SchemaColumn objects. Will not include fields for VarRecord or
ProjectBasedRecord objects.`,meathodReturn:"Vector",meathodReturnDescription:`Each entry will be a SchemaColumn object representing a column in
the database that this item can interact with.`,meathodParms:[]},{meathodName:"HasVariableDBFields",meathodDescription:`inherited -> AppRecord -> VarRecord -> ProjectBasedRecord
Tests whether the calling AppRecord is from a table with variable fields.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the calling AppRecord's table has variable fields.",meathodParms:[]},{meathodName:"IsFieldEqual",meathodDescription:`inherited -> AppRecord -> VarRecord -> ProjectBasedRecord
Tests for equivalence between the specified field and a value formatted as a string.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the field is found and is equal; false otherwise.",meathodParms:[{name:"fieldNameOrId",type:["int","string"],description:`If a non-numeric string, the name of the field to be tested.
Otherwise, it is converted to a number and taken as the
TS_ID of the field to be tested.`,optional:!1},{name:"value",type:"string",description:`The value to be compared to. The field's value will be
formatted as a string and compared to this value.`,optional:!1}]},{meathodName:"IsLocked",meathodDescription:`inherited -> AppRecord -> VarRecord -> ProjectBasedRecord
Tests whether the calling AppRecord has been locked, meaning it is in use by another
user.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record is locked by another user.",meathodParms:[{name:"lockedByThisUser",type:"bool",description:`Without an input parameter ( or with "false" as the input ),
IsLocked() means "Does someone else have this record
locked?"
With "true" as the input parameter, the meaning is "May I
(as the current user) update this record?"`,optional:!0}]},{meathodName:"Lock",meathodDescription:`inherited -> AppRecord -> VarRecord -> ProjectBasedRecord
Locks the calling AppRecord, so other users will not attempt
to update it.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record is locked by another user.",meathodParms:[{name:"stealLock",type:"bool",description:`Defaults to false, meaning if this item is already
locked, no lock will be established.
If true, any existing lock on this record will be broken, and
changes made by the former lock holder are lost.`,optional:!0}]},{meathodName:"Read",meathodDescription:`inherited -> AppRecord -> VarRecord -> ProjectBasedRecord
Looks up a row in the AppRecord's table`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the TS_ID or name was found, in which case the
calling AppRecord object becomes a copy of that row in the table.`,meathodParms:[{name:"recordIdOrName",type:["int","string"],description:`If this is an int or string that SBM ModScript can convert to
an int, it is taken as the value to search for in the TS_ID
column. All other parameter types are converted to a string
and searched for in the Name system field.`,optional:!1}]},{meathodName:"ReadWithWhere",meathodDescription:`inherited -> AppRecord -> VarRecord -> ProjectBasedRecord
Used to find a record by passing in a string containing a SQL
"where" clause, not including the keyword "where".`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the method found the record, in which case the calling
object becomes a copy of the record found. If more than one record
is found, the first one is copied to the calling object.`,meathodParms:[{name:"whereClause",type:"string",description:`The SQL "where" clause to find the specific record in the
table, not including the keyword "where".`,optional:!1},{name:"queryParams",type:"Vector",description:`queryParams is an optional Vector storing SQL bind
parameters, where each entry is a Pair, where the first value
is the parameter type and the second value is the value to
bind to the SQL parameter. See Pair, Map_Pair, and
Dictionary_Pair [page 123].
For the type parameter, use DBTypeConstants [page 347].`,optional:!0}]},{meathodName:"ReadByColumn",meathodDescription:`inherited -> AppRecord -> VarRecord -> ProjectBasedRecord
Reads any record type by a column value`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the item is read successfully; false if the item is not
found.`,meathodParms:[{name:"columnName",type:"string",description:"The database name of the column without the TS_ prefix.",optional:!1},{name:"value",type:"Variant",description:`Behavior depends on the Variant internal type:
\u2022 string \u2013 ReadByColumn() will succeed if the column is a
text column.
\u2022 int, int64_t, short, byte, or bool \u2013 ReadByColumn() will
succeed if the column is an integer column.
\u2022 float or double \u2013 ReadByColumn() will succeed if the
column is a floating point column.`,optional:!1}]},{meathodName:"ReadByColumnAndColumn",meathodDescription:`inherited -> AppRecord -> VarRecord -> ProjectBasedRecord
Reads any record type by two column values`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the item is read successfully; false if the item is not
found.`,meathodParms:[{name:"columnName",type:"string",description:'The name of the column without the "TS_" prefix',optional:!1},{name:"value",type:"Variant",description:`Value must be an int, int64_t, short, byte, bool, or string
that can be converted to an int.`,optional:!1},{name:"column2Name",type:"string",description:'The name of the second column without the "TS_" prefix.',optional:!1},{name:"value2",type:"Variant",description:`Behavior depends on the Variant internal type:
\u2022 string \u2013 ReadByColumn() will succeed if the column is a
text column.
\u2022 int, int64_t, short, byte, or bool \u2013 ReadByColumn() will
succeed if the column is an integer column.
\u2022 float or double \u2013 Not supported.`,optional:!1}]},{meathodName:"ReadByUUID",meathodDescription:`inherited -> AppRecord -> VarRecord -> ProjectBasedRecord
Reads the item using the UUID column, if it exists.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the record was found, in which case the
calling AppRecord object becomes a copy of that row in the table.`,meathodParms:[{name:"itemUUID",type:"string",description:"The UUID value that is passed in.",optional:!1}]},{meathodName:"SetName",meathodDescription:`inherited -> AppRecord -> VarRecord -> ProjectBasedRecord
Sets the "name" value of the calling object.`,meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"newName",type:"string",description:"Text to be used as the new name for the item.",optional:!1}]},{meathodName:"Unlock",meathodDescription:`inherited -> AppRecord -> VarRecord -> ProjectBasedRecord
Unlocks the calling AppRecord, signaling that it is available
for other users.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the record was successfully unlocked or was not
locked to begin with.`,meathodParms:[{name:"currentUserOnly",type:"bool",description:`Defaults to false. If true, only the current user's
lock is unlocked. If false, any user's lock on this record is
removed.`,optional:!0}]},{meathodName:"Update",meathodDescription:`inherited -> AppRecord -> VarRecord -> ProjectBasedRecord
This method updates the item in the database using the
values from the item.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record is updated in the database.",meathodParms:[]},{meathodName:"UpdateWithLock",meathodDescription:`inherited -> AppRecord -> VarRecord -> ProjectBasedRecord
Updates the record that has been previously locked with
Lock() function.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record was successfully updated; false otherwise.",meathodParms:[{name:"stealLock",type:"bool",description:`Optional parameter that allows the user to skip the Lock()
function and steal the lock during the update. Defaults to
false. If true, any other user's existing lock will be broken,
causing that user's changes to be lost.`,optional:!0}]}],properties:[],inheritsDone:!0},Lib:{className:"Lib",exposed:!1,inheritsFrom:"",classDescription:`A class for loading and invoking a custom DLL. For details on usage and examples, refer
to Calling Functions in a DLL from SBM ModScript [page 360].
To create Use CreateObject() [page 107] with "SBMLibrary".`,meathods:[{meathodName:"SetLibraryName",meathodDescription:"Sets the DLL name.",meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"name",type:"string",description:`The name\u2014and optionally the path\u2014of the DLL. For details,
refer to Loading the Library in SBM ModScript [page 361].`,optional:!1}]},{meathodName:"LoadLibrary",meathodDescription:"Loads the DLL.",meathodReturn:"bool",meathodReturnDescription:`Returns true if the DLL was successfully loaded; returns false
otherwise.`,meathodParms:[]},{meathodName:"FreeLibrary",meathodDescription:"Unloads a previously loaded DLL.",meathodReturn:"bool",meathodReturnDescription:`Returns true if the DLL was successfully unloaded; returns false
otherwise.`,meathodParms:[]},{meathodName:"IsLibraryLoaded",meathodDescription:"Verifies if the library has already been loaded.",meathodReturn:"bool",meathodReturnDescription:"Returns true if the library is already loaded; returns false otherwise.",meathodParms:[]},{meathodName:"CallLibraryFunction",meathodDescription:"Sets the DLL name.",meathodReturn:"Variant",meathodReturnDescription:"Returns the integer that the DLL function returned.",meathodParms:[{name:"name",type:"string",description:"The function to be invoked.",optional:!1},{name:"argVect",type:"Vector",description:`(Input/Ouput) All entries in the Vector will be converted to
string and passed as input/output parameters to the DLL.
If the DLL sets any of the parameters to a new value, the
engine attempts to convert the string back to the original
data type of the object inside the Vector. See example
below.`,optional:!0}]},{meathodName:"CallLibraryFunctionInt",meathodDescription:"Sets the DLL name.",meathodReturn:"int",meathodReturnDescription:"Returns the integer that the DLL function returned.",meathodParms:[{name:"name",type:"string",description:"The function to be invoked.",optional:!1},{name:"argVect",type:"Vector",description:`(Input/Ouput) All entries in the Vector will be converted to
string and passed as input/output parameters to the DLL.
If the DLL sets any of the parameters to a new value, the
engine attempts to convert the string back to the original
data type of the object inside the Vector. See example
below.`,optional:!1}]}],properties:[]},Locale:{className:"Locale",exposed:!1,inheritsFrom:"",classDescription:"Provides functions that create a locale.",meathods:[],properties:[]},Log:{className:"Log",exposed:!1,inheritsFrom:"",classDescription:`A class for writing output messages and appending an output log file. Optionally,
datestamps can be pre-pended to output messages.`,meathods:[],properties:[]},Project:{className:"Project",exposed:!1,inheritsFrom:"TreeItem",classDescription:`A project represents any SBM project and is stored in the TS_PROJECTS table. To examine
the project hierarchy or generate the full project name, use inherited TreeItem methods.`,meathods:[{meathodName:"Add",meathodDescription:`inherited -> AppRecord -> TreeItem
This method adds a new row to a table. After creating an AppRecord from
the desired table and setting any desired field values, use this method to add the
record as a new row in its table. This is not for use with Primary tables, because
those items must go through a Submit transition. However, it is possible to make a
copy of a Primary table item using this method.`,meathodReturn:"int",meathodReturnDescription:`The TS_ID of the record added, which is unique to this table.
Zero means the record could not be added due to an error.`,meathodParms:[]},{meathodName:"Delete",meathodDescription:`inherited -> AppRecord -> TreeItem
On most tables, this method removes the record from the database. On
tables such as States and Users, the records are marked as deleted but remain in
the database.`,meathodReturn:"bool",meathodReturnDescription:`True if the record is deleted from or marked as deleted in the
database.`,meathodParms:[]},{meathodName:"Fields",meathodDescription:`inherited -> AppRecord -> TreeItem
Returns a VarFieldList containing all fields for a VarRecord.`,meathodReturn:"VarFieldList",meathodReturnDescription:`The list of fields from this AppRecord. If there is no FieldList for this
record, this method returns null. Use is_var_null() to check for
null.`,meathodParms:[]},{meathodName:"GetDisplayName",meathodDescription:`inherited -> AppRecord -> TreeItem
Returns the display name of a record.`,meathodReturn:"string",meathodReturnDescription:"This record's display name, formatted according to table settings.",meathodParms:[]},{meathodName:"GetFieldValue",meathodDescription:`inherited -> AppRecord -> TreeItem
Gets the value of any field.`,meathodReturn:"Variant",meathodReturnDescription:`The internal value for a field or column.
For Text fields, this is the exact value entered in the field;
for selection fields, the value is the database ID for the
selection. For values that are not Variant or TimeT, this
internally gets the value from the field as a Variant, and
then tries to convert the value to the requested type.
TimeT can be used with Date/Time fields to get the
internal date value.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueString",meathodDescription:`inherited -> AppRecord -> TreeItem
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"string",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueInt",meathodDescription:`inherited -> AppRecord -> TreeItem
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"int",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueInt64",meathodDescription:`inherited -> AppRecord -> TreeItem
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"int64_t",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueDouble",meathodDescription:`inherited -> AppRecord -> TreeItem
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"double",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueTimeT",meathodDescription:`inherited -> AppRecord -> TreeItem
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"TimeT",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetId",meathodDescription:`inherited -> AppRecord -> TreeItem
Retrieves the current AppRecord's TS_ID.`,meathodReturn:"int",meathodReturnDescription:"TS_ID of the calling AppRecord.",meathodParms:[]},{meathodName:"GetUUID",meathodDescription:`inherited -> AppRecord -> TreeItem
Returns the item's UUID, if applicable.`,meathodReturn:"string",meathodReturnDescription:"The item's UUID.",meathodParms:[]},{meathodName:"GetName",meathodDescription:`inherited -> AppRecord -> TreeItem
Gets the calling AppRecord's "Name" system field.`,meathodReturn:"string",meathodReturnDescription:"A text string from the associated Name field.",meathodParms:[]},{meathodName:"GetRecTableId",meathodDescription:`inherited -> AppRecord -> TreeItem
Returns the calling AppRecord's table ID.`,meathodReturn:"int",meathodReturnDescription:"The calling AppRecord's table ID.",meathodParms:[]},{meathodName:"GetSchemaColumns",meathodDescription:`inherited -> AppRecord -> TreeItem
Returns a Vector of SchemaColumn objects. Will not include fields for VarRecord or
ProjectBasedRecord objects.`,meathodReturn:"Vector",meathodReturnDescription:`Each entry will be a SchemaColumn object representing a column in
the database that this item can interact with.`,meathodParms:[]},{meathodName:"HasVariableDBFields",meathodDescription:`inherited -> AppRecord -> TreeItem
Tests whether the calling AppRecord is from a table with variable fields.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the calling AppRecord's table has variable fields.",meathodParms:[]},{meathodName:"IsFieldEqual",meathodDescription:`inherited -> AppRecord -> TreeItem
Tests for equivalence between the specified field and a value formatted as a string.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the field is found and is equal; false otherwise.",meathodParms:[{name:"fieldNameOrId",type:["int","string"],description:`If a non-numeric string, the name of the field to be tested.
Otherwise, it is converted to a number and taken as the
TS_ID of the field to be tested.`,optional:!1},{name:"value",type:"string",description:`The value to be compared to. The field's value will be
formatted as a string and compared to this value.`,optional:!1}]},{meathodName:"IsLocked",meathodDescription:`inherited -> AppRecord -> TreeItem
Tests whether the calling AppRecord has been locked, meaning it is in use by another
user.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record is locked by another user.",meathodParms:[{name:"lockedByThisUser",type:"bool",description:`Without an input parameter ( or with "false" as the input ),
IsLocked() means "Does someone else have this record
locked?"
With "true" as the input parameter, the meaning is "May I
(as the current user) update this record?"`,optional:!0}]},{meathodName:"Lock",meathodDescription:`inherited -> AppRecord -> TreeItem
Locks the calling AppRecord, so other users will not attempt
to update it.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record is locked by another user.",meathodParms:[{name:"stealLock",type:"bool",description:`Defaults to false, meaning if this item is already
locked, no lock will be established.
If true, any existing lock on this record will be broken, and
changes made by the former lock holder are lost.`,optional:!0}]},{meathodName:"Read",meathodDescription:`inherited -> AppRecord -> TreeItem
Looks up a row in the AppRecord's table`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the TS_ID or name was found, in which case the
calling AppRecord object becomes a copy of that row in the table.`,meathodParms:[{name:"recordIdOrName",type:["int","string"],description:`If this is an int or string that SBM ModScript can convert to
an int, it is taken as the value to search for in the TS_ID
column. All other parameter types are converted to a string
and searched for in the Name system field.`,optional:!1}]},{meathodName:"ReadWithWhere",meathodDescription:`inherited -> AppRecord -> TreeItem
Used to find a record by passing in a string containing a SQL
"where" clause, not including the keyword "where".`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the method found the record, in which case the calling
object becomes a copy of the record found. If more than one record
is found, the first one is copied to the calling object.`,meathodParms:[{name:"whereClause",type:"string",description:`The SQL "where" clause to find the specific record in the
table, not including the keyword "where".`,optional:!1},{name:"queryParams",type:"Vector",description:`queryParams is an optional Vector storing SQL bind
parameters, where each entry is a Pair, where the first value
is the parameter type and the second value is the value to
bind to the SQL parameter. See Pair, Map_Pair, and
Dictionary_Pair [page 123].
For the type parameter, use DBTypeConstants [page 347].`,optional:!0}]},{meathodName:"ReadByColumn",meathodDescription:`inherited -> AppRecord -> TreeItem
Reads any record type by a column value`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the item is read successfully; false if the item is not
found.`,meathodParms:[{name:"columnName",type:"string",description:"The database name of the column without the TS_ prefix.",optional:!1},{name:"value",type:"Variant",description:`Behavior depends on the Variant internal type:
\u2022 string \u2013 ReadByColumn() will succeed if the column is a
text column.
\u2022 int, int64_t, short, byte, or bool \u2013 ReadByColumn() will
succeed if the column is an integer column.
\u2022 float or double \u2013 ReadByColumn() will succeed if the
column is a floating point column.`,optional:!1}]},{meathodName:"ReadByColumnAndColumn",meathodDescription:`inherited -> AppRecord -> TreeItem
Reads any record type by two column values`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the item is read successfully; false if the item is not
found.`,meathodParms:[{name:"columnName",type:"string",description:'The name of the column without the "TS_" prefix',optional:!1},{name:"value",type:"Variant",description:`Value must be an int, int64_t, short, byte, bool, or string
that can be converted to an int.`,optional:!1},{name:"column2Name",type:"string",description:'The name of the second column without the "TS_" prefix.',optional:!1},{name:"value2",type:"Variant",description:`Behavior depends on the Variant internal type:
\u2022 string \u2013 ReadByColumn() will succeed if the column is a
text column.
\u2022 int, int64_t, short, byte, or bool \u2013 ReadByColumn() will
succeed if the column is an integer column.
\u2022 float or double \u2013 Not supported.`,optional:!1}]},{meathodName:"ReadByUUID",meathodDescription:`inherited -> AppRecord -> TreeItem
Reads the item using the UUID column, if it exists.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the record was found, in which case the
calling AppRecord object becomes a copy of that row in the table.`,meathodParms:[{name:"itemUUID",type:"string",description:"The UUID value that is passed in.",optional:!1}]},{meathodName:"SetFieldValue",meathodDescription:`inherited -> AppRecord -> TreeItem
Sets the value of any column.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the column value was successfully set; false
otherwise.`,meathodParms:[{name:"name",type:"string",description:`The name of the column whose value will be set in the
AppRecord schema.`,optional:!1},{name:"value",type:["int","string","int64_t","double","TimeT","Variant"],description:`The new value for the column. The value
must be specified as it is stored in the database. For
example, for integer columns that are a foreign key to the
TS_USERS table, the value must be the database ID for
the user. TimeT values should only be used with columns
that represent dates, either as a native database date or
as a integer that represents dates in Unix Epoch time
format.`,optional:!1}]},{meathodName:"SetName",meathodDescription:`inherited -> AppRecord -> TreeItem
Sets the "name" value of the calling object.`,meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"newName",type:"string",description:"Text to be used as the new name for the item.",optional:!1}]},{meathodName:"Unlock",meathodDescription:`inherited -> AppRecord -> TreeItem
Unlocks the calling AppRecord, signaling that it is available
for other users.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the record was successfully unlocked or was not
locked to begin with.`,meathodParms:[{name:"currentUserOnly",type:"bool",description:`Defaults to false. If true, only the current user's
lock is unlocked. If false, any user's lock on this record is
removed.`,optional:!0}]},{meathodName:"Update",meathodDescription:`inherited -> AppRecord -> TreeItem
This method updates the item in the database using the
values from the item.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record is updated in the database.",meathodParms:[]},{meathodName:"UpdateWithLock",meathodDescription:`inherited -> AppRecord -> TreeItem
Updates the record that has been previously locked with
Lock() function.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record was successfully updated; false otherwise.",meathodParms:[{name:"stealLock",type:"bool",description:`Optional parameter that allows the user to skip the Lock()
function and steal the lock during the update. Defaults to
false. If true, any other user's existing lock will be broken,
causing that user's changes to be lost.`,optional:!0}]}],properties:[],inheritsDone:!0},ProjectBasedRecord:{className:"ProjectBasedRecord",exposed:!1,inheritsFrom:"VarRecord",classDescription:`A ProjectBasedRecord is any record from a primary table. It thus represents items that
	belong to a project and can be transitioned. ProjectBasedRecord objects require a table ID
	at creation using Ext.CreateProjectBasedRecord().`,meathods:[{meathodName:"GetProjectId",meathodDescription:"Identifies the calling record's project.",meathodReturn:"int",meathodReturnDescription:"TS_ID of the calling record's project.",meathodParms:[]},{meathodName:"StartSubmitToProject",meathodDescription:`Starts a submit transition for an item using a project ID,
				project UUID, or project internal name.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if transition was started. If false, use
				Shell.GetLastErrorMessage() for more information`,meathodParms:[{name:"project",type:["int","string"],description:"Can be project ID, project UUID, or project internal name.",optional:!1}]},{meathodName:"StartSubmitToProjectUsingTransition",meathodDescription:`Starts a submit transition for an item, specifying the project
and transition to use.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if transition was started. If false, use
Shell.GetLastErrorMessage() for more information.`,meathodParms:[{name:"project",type:["int","string"],description:"Can be project ID, project UUID, or project internal name.",optional:!1},{name:"trans",type:["int","string"],description:`Can be transition ID, transition UUID, or transition internal
name.`,optional:!1}]},{meathodName:"FinishSubmitToProject",meathodDescription:"Finishes a submit transition for an item.",meathodReturn:"bool",meathodReturnDescription:`Returns true if transition completed successfully. If false, use
Shell.GetLastErrorMessage() for more information.`,meathodParms:[{name:"signedUserID",type:"string",description:`Optional. Provides the user name portion of the signature if
the transition requires a user's signature.`,optional:!0},{name:"signedUserPwd",type:"string",description:`Optional, required if signedUserID is provided. Provides the
password portion of the signature if the transition requires a
user's signature.`,optional:!0}]},{meathodName:"FinishSubmitToProjectUsingTransition",meathodDescription:`Finish a submit transition for an item using a non-default
transition.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if transition completed successfully. If false, use
Shell.GetLastErrorMessage() for more information.`,meathodParms:[{name:"trans",type:["int","string"],description:`Can be transition ID, transition UUID, or transition internal
name.`,optional:!1},{name:"signedUserID",type:"string",description:`Optional. Provides the user name portion of the signature if
the transition requires a user's signature.`,optional:!0},{name:"signedUserPwd",type:"string",description:`Optional, required if signedUserID is provided. Provides the
password portion of the signature if the transition requires a
user's signature.`,optional:!0}]},{meathodName:"QuickSubmitToProject",meathodDescription:` Identical to FinishSubmitToProject() except
StartSubmitToProject() is not required, and thus, the project must be specified.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if transition completed successfully. If false, use
Shell.GetLastErrorMessage() for more information.`,meathodParms:[{name:"project",type:["int","string"],description:"Can be project ID, project UUID, or project internal name.",optional:!1},{name:"signedUserID",type:"string",description:`Optional. Provides the user name portion of the signature if
the transition requires a user's signature.`,optional:!0},{name:"signedUserPwd",type:"string",description:`Optional, required if signedUserID is provided. Provides the
password portion of the signature if the transition requires a
user's signature.`,optional:!0}]},{meathodName:"QuickSubmitToProjectUsingTransition",meathodDescription:`Identical to FinishSubmitToProjectUsingTransition() except
StartSubmitToProjectUsingTransition() is not required, and thus, the project must be
specified.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if transition completed successfully. If false, use
Shell.GetLastErrorMessage() for more information.`,meathodParms:[{name:"project",type:["int","string"],description:"Can be project ID, project UUID, or project internal name.",optional:!1},{name:"trans",type:["int","string"],description:`Can be transition ID, transition UUID, or transition internal
name.`,optional:!1},{name:"signedUserID",type:"string",description:`Optional. Provides the user name portion of the signature if
the transition requires a user's signature.`,optional:!0},{name:"signedUserPwd",type:"string",description:`Optional, required if signedUserID is provided. Provides the
password portion of the signature if the transition requires a
user's signature.`,optional:!0}]},{meathodName:"GetDisplayIssueId",meathodDescription:`inherited -> VarRecord
Returns the item's display ID, consisting of a prefix indicating the item's type and a serial
number within the item's project.`,meathodReturn:"string",meathodReturnDescription:"The item's display ID.",meathodParms:[]},{meathodName:"GetFieldValue",meathodDescription:`inherited -> VarRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"Variant",meathodReturnDescription:`The internal value for the field. For Text fields,
this is the exact value entered in the field. For values that
are not Variant or TimeT, this internally gets the value
from the field as a Variant, and then tries to convert the
value to the requested type.
TimeT can be used with Date/Time fields to get the
internal date value.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the calling record's variable field list.
Field names for variable fields should be provided in upper
case for database names (TITLE, for example) or in lower/
mixed-case for display names (Title, for example). For
details on working with different types of database fields,
refer to Working with SBM Database Fields [page 39].`,optional:!1}]},{meathodName:"GetItemNumber",meathodDescription:`inherited -> VarRecord
Returns the numeric portion of the item's display ID.`,meathodReturn:"int",meathodReturnDescription:"The item's display ID.",meathodParms:[]},{meathodName:"GetItemPrefix",meathodDescription:`inherited -> VarRecord
Returns the prefix of the item's display ID, indicating the item's type. Item types and their
prefixes are defined when an SBM designer configures a workflow.`,meathodReturn:"string",meathodReturnDescription:"The prefix of the item's display ID.",meathodParms:[]},{meathodName:"GetStateId",meathodDescription:`inherited -> VarRecord
Identifies the calling record's state within a workflow.`,meathodReturn:"int",meathodReturnDescription:`TS_ID of the record's state within the item's workflow. If the record
is not from a primary table, then it does not have a workflow and the
return value is -1.`,meathodParms:[]},{meathodName:"SetFieldValue",meathodDescription:`inherited -> VarRecord
Sets the value of any column.`,meathodReturn:"bool",meathodReturnDescription:"True if the field was changed.",meathodParms:[{name:"name",type:"string",description:`The name of the column whose value will be set in the
AppRecord schema.`,optional:!1},{name:"recordIdOrName",type:["int","string","int64_t","double","TimeT","Variant"],description:`The new value for the column. The value
must be specified as it is stored in the database. For
example, for integer columns that are a foreign key to the
TS_USERS table, the value must be the database ID for
the user. TimeT values should only be used with columns
that represent dates, either as a native database date or
as a integer that represents dates in Unix Epoch time
format.`,optional:!1},{name:"fieldList",type:"Variant",description:`Optional. If supplied and equal to the global
constant Nothing, this parameter will refer to the calling
record's VarFieldList when this method returns. If supplied
and not equal to Nothing, this parameter is taken to be the
calling record's VarFieldList.
Do not set this parameter's value yourself. Always pass a
variable set to Nothing and then reuse the variable for
subsequent calls to GetFieldValue() and SetFieldValue() on
the same VarRecord object. If this parameter is omitted,
no functionality changes, but efficiency may suffer.`,optional:!0},{name:"field",type:"Variant",description:`Optional. If supplied and equal to the global
constant Nothing, this parameter will refer to the Field
object on the calling record's VarFieldList whose name
matches the name input parameter when this method
returns. If supplied and not equal to Nothing, this
parameter is taken to be that Field object.`,optional:!0}]},{meathodName:"StartTransition",meathodDescription:`inherited -> VarRecord
Starts a transition on an item.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if transition was started. If false, use
Shell.GetLastErrorMessage() for more information.`,meathodParms:[{name:"trans",type:"Variant",description:`Can be transition ID, 0 (will use default Update transition
for item), transition UUID, or transition internal name.`,optional:!1},{name:"stealLock",type:"bool",description:`If true, any item lock on this item will be stolen by
this transition. If it was locked, the user who had the item
locked (in transition) will not be able to complete their
transition. Does not guarantee that the transition succeeds,
as scripts can steal locks from each other.`,optional:!0}]},{meathodName:"StartTransitionWithLock",meathodDescription:`inherited -> VarRecord
 Identical to StartTransition(), assumes AppRecord.Lock()
has been invoked.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if transition was started. If false, use
Shell.GetLastErrorMessage() for more information.`,meathodParms:[{name:"trans",type:"Variant",description:`Can be transition ID, 0 (will use default Update transition
for item), transition UUID, or transition internal name.`,optional:!1},{name:"stealLock",type:"bool",description:`If true, any item lock on this item will be stolen by
this transition. If it was locked, the user who had the item
locked (in transition) will not be able to complete their
transition. Does not guarantee that the transition succeeds,
as scripts can steal locks from each other.`,optional:!0}]},{meathodName:"FinishTransition",meathodDescription:`inherited -> VarRecord
Finishes a transition on an item after StartTransition() has
been invoked and field values have been set.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if transition completed successfully. If false, use
Shell.GetLastErrorMessage() for more information.`,meathodParms:[{name:"trans",type:"Variant",description:`Can be transition ID, 0 (will use default Update transition
for item), transition UUID, or transition internal name.`,optional:!1},{name:"stealLock",type:"bool",description:`If true, any item lock on this item will be stolen by
this transition. If it was locked, the user who had the item
locked (in transition) will not be able to complete their
transition. Does not guarantee that the transition succeeds,
as scripts can steal locks from each other.`,optional:!0},{name:"signedUserID",type:"string",description:`Optional. Provides the user name portion of the signature if
the transition requires a user's signature.`,optional:!0},{name:"signedUserPwd",type:"string",description:`Optional, required if signedUserID is provided. Provides the
password portion of the signature if the transition requires a
user's signature.`,optional:!0}]},{meathodName:"QuickTransition",meathodDescription:`inherited -> VarRecord
Identical to FinishTransition() except that StartTransition() is
not required.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if transition completed successfully. If false, use
Shell.GetLastErrorMessage() for more information.`,meathodParms:[{name:"trans",type:"Variant",description:`Can be transition ID, 0 (will use default Update transition
for item), transition UUID, or transition internal name.`,optional:!1},{name:"stealLock",type:"bool",description:`If true, any item lock on this item will be stolen by
this transition. If it was locked, the user who had the item
locked (in transition) will not be able to complete their
transition. Does not guarantee that the transition succeeds,
as scripts can steal locks from each other.`,optional:!0},{name:"signedUserID",type:"string",description:`Optional. Provides the user name portion of the signature if
the transition requires a user's signature.`,optional:!0},{name:"signedUserPwd",type:"string",description:`Optional, required if signedUserID is provided. Provides the
password portion of the signature if the transition requires a
user's signature.`,optional:!0}]},{meathodName:"StartSubmitToAux",meathodDescription:`inherited -> VarRecord
Starts the submit of a new item into an auxiliary table.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if transition completed successfully. If false, use
Shell.GetLastErrorMessage() for more information.`,meathodParms:[]},{meathodName:"FinishSubmitToAux",meathodDescription:`inherited -> VarRecord
Finishes the submit into an auxiliary table.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if transition completed successfully. If false, use
Shell.GetLastErrorMessage() for more information.`,meathodParms:[]},{meathodName:"QuickSubmitToAux",meathodDescription:`inherited -> VarRecord
Identical to FinishSubmitToAux except StartSubmitToAux is
not required.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if transition completed successfully. If false, use
Shell.GetLastErrorMessage() for more information.`,meathodParms:[]},{meathodName:"Add",meathodDescription:`inherited -> AppRecord -> VarRecord
This method adds a new row to a table. After creating an AppRecord from
the desired table and setting any desired field values, use this method to add the
record as a new row in its table. This is not for use with Primary tables, because
those items must go through a Submit transition. However, it is possible to make a
copy of a Primary table item using this method.`,meathodReturn:"int",meathodReturnDescription:`The TS_ID of the record added, which is unique to this table.
Zero means the record could not be added due to an error.`,meathodParms:[]},{meathodName:"Delete",meathodDescription:`inherited -> AppRecord -> VarRecord
On most tables, this method removes the record from the database. On
tables such as States and Users, the records are marked as deleted but remain in
the database.`,meathodReturn:"bool",meathodReturnDescription:`True if the record is deleted from or marked as deleted in the
database.`,meathodParms:[]},{meathodName:"Fields",meathodDescription:`inherited -> AppRecord -> VarRecord
Returns a VarFieldList containing all fields for a VarRecord.`,meathodReturn:"VarFieldList",meathodReturnDescription:`The list of fields from this AppRecord. If there is no FieldList for this
record, this method returns null. Use is_var_null() to check for
null.`,meathodParms:[]},{meathodName:"GetDisplayName",meathodDescription:`inherited -> AppRecord -> VarRecord
Returns the display name of a record.`,meathodReturn:"string",meathodReturnDescription:"This record's display name, formatted according to table settings.",meathodParms:[]},{meathodName:"GetFieldValueString",meathodDescription:`inherited -> AppRecord -> VarRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"string",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueInt",meathodDescription:`inherited -> AppRecord -> VarRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"int",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueInt64",meathodDescription:`inherited -> AppRecord -> VarRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"int64_t",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueDouble",meathodDescription:`inherited -> AppRecord -> VarRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"double",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueTimeT",meathodDescription:`inherited -> AppRecord -> VarRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"TimeT",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetId",meathodDescription:`inherited -> AppRecord -> VarRecord
Retrieves the current AppRecord's TS_ID.`,meathodReturn:"int",meathodReturnDescription:"TS_ID of the calling AppRecord.",meathodParms:[]},{meathodName:"GetUUID",meathodDescription:`inherited -> AppRecord -> VarRecord
Returns the item's UUID, if applicable.`,meathodReturn:"string",meathodReturnDescription:"The item's UUID.",meathodParms:[]},{meathodName:"GetName",meathodDescription:`inherited -> AppRecord -> VarRecord
Gets the calling AppRecord's "Name" system field.`,meathodReturn:"string",meathodReturnDescription:"A text string from the associated Name field.",meathodParms:[]},{meathodName:"GetRecTableId",meathodDescription:`inherited -> AppRecord -> VarRecord
Returns the calling AppRecord's table ID.`,meathodReturn:"int",meathodReturnDescription:"The calling AppRecord's table ID.",meathodParms:[]},{meathodName:"GetSchemaColumns",meathodDescription:`inherited -> AppRecord -> VarRecord
Returns a Vector of SchemaColumn objects. Will not include fields for VarRecord or
ProjectBasedRecord objects.`,meathodReturn:"Vector",meathodReturnDescription:`Each entry will be a SchemaColumn object representing a column in
the database that this item can interact with.`,meathodParms:[]},{meathodName:"HasVariableDBFields",meathodDescription:`inherited -> AppRecord -> VarRecord
Tests whether the calling AppRecord is from a table with variable fields.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the calling AppRecord's table has variable fields.",meathodParms:[]},{meathodName:"IsFieldEqual",meathodDescription:`inherited -> AppRecord -> VarRecord
Tests for equivalence between the specified field and a value formatted as a string.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the field is found and is equal; false otherwise.",meathodParms:[{name:"fieldNameOrId",type:["int","string"],description:`If a non-numeric string, the name of the field to be tested.
Otherwise, it is converted to a number and taken as the
TS_ID of the field to be tested.`,optional:!1},{name:"value",type:"string",description:`The value to be compared to. The field's value will be
formatted as a string and compared to this value.`,optional:!1}]},{meathodName:"IsLocked",meathodDescription:`inherited -> AppRecord -> VarRecord
Tests whether the calling AppRecord has been locked, meaning it is in use by another
user.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record is locked by another user.",meathodParms:[{name:"lockedByThisUser",type:"bool",description:`Without an input parameter ( or with "false" as the input ),
IsLocked() means "Does someone else have this record
locked?"
With "true" as the input parameter, the meaning is "May I
(as the current user) update this record?"`,optional:!0}]},{meathodName:"Lock",meathodDescription:`inherited -> AppRecord -> VarRecord
Locks the calling AppRecord, so other users will not attempt
to update it.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record is locked by another user.",meathodParms:[{name:"stealLock",type:"bool",description:`Defaults to false, meaning if this item is already
locked, no lock will be established.
If true, any existing lock on this record will be broken, and
changes made by the former lock holder are lost.`,optional:!0}]},{meathodName:"Read",meathodDescription:`inherited -> AppRecord -> VarRecord
Looks up a row in the AppRecord's table`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the TS_ID or name was found, in which case the
calling AppRecord object becomes a copy of that row in the table.`,meathodParms:[{name:"recordIdOrName",type:["int","string"],description:`If this is an int or string that SBM ModScript can convert to
an int, it is taken as the value to search for in the TS_ID
column. All other parameter types are converted to a string
and searched for in the Name system field.`,optional:!1}]},{meathodName:"ReadWithWhere",meathodDescription:`inherited -> AppRecord -> VarRecord
Used to find a record by passing in a string containing a SQL
"where" clause, not including the keyword "where".`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the method found the record, in which case the calling
object becomes a copy of the record found. If more than one record
is found, the first one is copied to the calling object.`,meathodParms:[{name:"whereClause",type:"string",description:`The SQL "where" clause to find the specific record in the
table, not including the keyword "where".`,optional:!1},{name:"queryParams",type:"Vector",description:`queryParams is an optional Vector storing SQL bind
parameters, where each entry is a Pair, where the first value
is the parameter type and the second value is the value to
bind to the SQL parameter. See Pair, Map_Pair, and
Dictionary_Pair [page 123].
For the type parameter, use DBTypeConstants [page 347].`,optional:!0}]},{meathodName:"ReadByColumn",meathodDescription:`inherited -> AppRecord -> VarRecord
Reads any record type by a column value`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the item is read successfully; false if the item is not
found.`,meathodParms:[{name:"columnName",type:"string",description:"The database name of the column without the TS_ prefix.",optional:!1},{name:"value",type:"Variant",description:`Behavior depends on the Variant internal type:
\u2022 string \u2013 ReadByColumn() will succeed if the column is a
text column.
\u2022 int, int64_t, short, byte, or bool \u2013 ReadByColumn() will
succeed if the column is an integer column.
\u2022 float or double \u2013 ReadByColumn() will succeed if the
column is a floating point column.`,optional:!1}]},{meathodName:"ReadByColumnAndColumn",meathodDescription:`inherited -> AppRecord -> VarRecord
Reads any record type by two column values`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the item is read successfully; false if the item is not
found.`,meathodParms:[{name:"columnName",type:"string",description:'The name of the column without the "TS_" prefix',optional:!1},{name:"value",type:"Variant",description:`Value must be an int, int64_t, short, byte, bool, or string
that can be converted to an int.`,optional:!1},{name:"column2Name",type:"string",description:'The name of the second column without the "TS_" prefix.',optional:!1},{name:"value2",type:"Variant",description:`Behavior depends on the Variant internal type:
\u2022 string \u2013 ReadByColumn() will succeed if the column is a
text column.
\u2022 int, int64_t, short, byte, or bool \u2013 ReadByColumn() will
succeed if the column is an integer column.
\u2022 float or double \u2013 Not supported.`,optional:!1}]},{meathodName:"ReadByUUID",meathodDescription:`inherited -> AppRecord -> VarRecord
Reads the item using the UUID column, if it exists.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the record was found, in which case the
calling AppRecord object becomes a copy of that row in the table.`,meathodParms:[{name:"itemUUID",type:"string",description:"The UUID value that is passed in.",optional:!1}]},{meathodName:"SetName",meathodDescription:`inherited -> AppRecord -> VarRecord
Sets the "name" value of the calling object.`,meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"newName",type:"string",description:"Text to be used as the new name for the item.",optional:!1}]},{meathodName:"Unlock",meathodDescription:`inherited -> AppRecord -> VarRecord
Unlocks the calling AppRecord, signaling that it is available
for other users.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the record was successfully unlocked or was not
locked to begin with.`,meathodParms:[{name:"currentUserOnly",type:"bool",description:`Defaults to false. If true, only the current user's
lock is unlocked. If false, any user's lock on this record is
removed.`,optional:!0}]},{meathodName:"Update",meathodDescription:`inherited -> AppRecord -> VarRecord
This method updates the item in the database using the
values from the item.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record is updated in the database.",meathodParms:[]},{meathodName:"UpdateWithLock",meathodDescription:`inherited -> AppRecord -> VarRecord
Updates the record that has been previously locked with
Lock() function.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record was successfully updated; false otherwise.",meathodParms:[{name:"stealLock",type:"bool",description:`Optional parameter that allows the user to skip the Lock()
function and steal the lock during the update. Defaults to
false. If true, any other user's existing lock will be broken,
causing that user's changes to be lost.`,optional:!0}]}],properties:[],inheritsDone:!0},Regex:{className:"Regex",exposed:!1,inheritsFrom:"",classDescription:"Constructor for Regex object. A Regex object cannot be stored in a Variant.",meathods:[{meathodName:"Compile",meathodDescription:"Compiles a regular expression.",meathodReturn:"bool",meathodReturnDescription:"Returns false if Compile() fails.",meathodParms:[{name:"pattern",type:"string",description:"Holds the regular expression pattern to be compiled.",optional:!1},{name:"options",type:"int",description:`Indicates regular expression behavior, such as case
sensitivity. See RegexOptionBitsConstants [page 353]. Bits
can be combined using the bitwise OR operator: | .`,optional:!0}]},{meathodName:"Matches",meathodDescription:"Executes a search for a match in a string.",meathodReturn:"bool",meathodReturnDescription:"Returns true if a match was found.",meathodParms:[{name:"value",type:"string",description:"Holds the string to be searched.",optional:!1},{name:"offset",type:"int",description:`The index that denotes where in the string to start the
search; use 0 to start at the beginning.`,optional:!0},{name:"start",type:"int",description:`(Output) If a match was found, the zero-based index of the
beginning of the matched-text.`,optional:!0},{name:"end",type:"int",description:`(Output) If a match was found, the zero-based index of the
end of the matched-text.`,optional:!0}]},{meathodName:"MatchesAgain",meathodDescription:"Once Matches() has been called, use MatchesAgain to find the next match.",meathodReturn:"bool",meathodReturnDescription:`Returns true if the compiled regular expression matches the value
passed in.`,meathodParms:[{name:"start",type:"int",description:`(Output) If a match was found, the zero-based index of the
beginning of the matched-text.`,optional:!0},{name:"end",type:"int",description:`(Output) If a match was found, the zero-based index of the
end of the matched-text.`,optional:!0}]},{meathodName:"ReplaceAll",meathodDescription:"Replaces all matched parts of a string with a replacement value using the compiled regex.",meathodReturn:"string",meathodReturnDescription:`A string where all matches for the compiled Regex in "value" are
replaced with "replacement".`,meathodParms:[{name:"value",type:"string",description:"The string to be searched.",optional:!1},{name:"replacement",type:"string",description:"The value inserted into the string in the matched locations.",optional:!1}]},{meathodName:"ReplaceFirst",meathodDescription:`Replaces the first matched part of a string with a replacement value using the compiled
regex.`,meathodReturn:"string",meathodReturnDescription:`A string where the first match for the compiled Regex in "value" is
replaced with "replacement".`,meathodParms:[{name:"value",type:"string",description:"The string to be searched.",optional:!1},{name:"replacement",type:"string",description:`The value inserted into the string in the first matched
location.`,optional:!1}]},{meathodName:"GetLastError",meathodDescription:"Provides an error message explanation if Compile() or Matches() fails.",meathodReturn:"string",meathodReturnDescription:"The text of the last error message.",meathodParms:[]},{meathodName:"GroupCount",meathodDescription:`After calling Matches(), if the regex pattern used parenthesis to denote grouping,
GroupCount() returns the number of groups.`,meathodReturn:"int",meathodReturnDescription:"The number of groups.",meathodParms:[]},{meathodName:"GroupVal",meathodDescription:`After calling Matches(), if the regex pattern used parenthesis to denote grouping, this
returns the group specified.`,meathodReturn:"string",meathodReturnDescription:"The specified group.",meathodParms:[{name:"group",type:"int",description:`Value 0 will return the full text matched by the regex; groups
1-n (see GroupCount() [page 266]) will return the groupings
that the regex pattern identified using parentheses.`,optional:!1}]},{meathodName:"Split",meathodDescription:"Splits the string into parts using the regular expression as a delineator.",meathodReturn:"Vector",meathodReturnDescription:"A Vector containing substrings as its elements.",meathodParms:[{name:"value",type:"string",description:"The string to be searched.",optional:!1},{name:"trim",type:"bool",description:`If true, the resulting strings in the Vector will have the
whitespace trimmed.`,optional:!1}]}],properties:[]},RESTDataSource:{className:"RESTDataSource",exposed:!1,inheritsFrom:"AppRecord",classDescription:`This class reads records from the TS_RESTDATASOURCE table and invokes the described
REST call. You can define REST Data Sources in SBM Composer, and then bind them to
endpoints that are configurable per environment in Application Repository. You can set up
a server to host custom behavior written in any programming language (C#, Java,
Groovy, Python, etc.) and SBM ModScript can interact with that server, either gathering
data or invoking actions to be taken based on activity occurring in SBM. Because you can
run SBM ModScripts during a transition, during a notification, or trigger them by a simple
URL, this is a powerful integration point.
For more details on working with the RESTDataSource object, see
https://www.serenacentral.com/blogs/entry/sbm-modscript-part-8-rest-callouts.`,meathods:[{meathodName:"Add",meathodDescription:`inherited -> AppRecord
This method adds a new row to a table. After creating an AppRecord from
the desired table and setting any desired field values, use this method to add the
record as a new row in its table. This is not for use with Primary tables, because
those items must go through a Submit transition. However, it is possible to make a
copy of a Primary table item using this method.`,meathodReturn:"int",meathodReturnDescription:`The TS_ID of the record added, which is unique to this table.
Zero means the record could not be added due to an error.`,meathodParms:[]},{meathodName:"Delete",meathodDescription:`inherited -> AppRecord
On most tables, this method removes the record from the database. On
tables such as States and Users, the records are marked as deleted but remain in
the database.`,meathodReturn:"bool",meathodReturnDescription:`True if the record is deleted from or marked as deleted in the
database.`,meathodParms:[]},{meathodName:"Fields",meathodDescription:`inherited -> AppRecord
Returns a VarFieldList containing all fields for a VarRecord.`,meathodReturn:"VarFieldList",meathodReturnDescription:`The list of fields from this AppRecord. If there is no FieldList for this
record, this method returns null. Use is_var_null() to check for
null.`,meathodParms:[]},{meathodName:"GetDisplayName",meathodDescription:`inherited -> AppRecord
Returns the display name of a record.`,meathodReturn:"string",meathodReturnDescription:"This record's display name, formatted according to table settings.",meathodParms:[]},{meathodName:"GetFieldValue",meathodDescription:`inherited -> AppRecord
Gets the value of any field.`,meathodReturn:"Variant",meathodReturnDescription:`The internal value for a field or column.
For Text fields, this is the exact value entered in the field;
for selection fields, the value is the database ID for the
selection. For values that are not Variant or TimeT, this
internally gets the value from the field as a Variant, and
then tries to convert the value to the requested type.
TimeT can be used with Date/Time fields to get the
internal date value.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueString",meathodDescription:`inherited -> AppRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"string",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueInt",meathodDescription:`inherited -> AppRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"int",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueInt64",meathodDescription:`inherited -> AppRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"int64_t",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueDouble",meathodDescription:`inherited -> AppRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"double",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueTimeT",meathodDescription:`inherited -> AppRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"TimeT",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetId",meathodDescription:`inherited -> AppRecord
Retrieves the current AppRecord's TS_ID.`,meathodReturn:"int",meathodReturnDescription:"TS_ID of the calling AppRecord.",meathodParms:[]},{meathodName:"GetUUID",meathodDescription:`inherited -> AppRecord
Returns the item's UUID, if applicable.`,meathodReturn:"string",meathodReturnDescription:"The item's UUID.",meathodParms:[]},{meathodName:"GetName",meathodDescription:`inherited -> AppRecord
Gets the calling AppRecord's "Name" system field.`,meathodReturn:"string",meathodReturnDescription:"A text string from the associated Name field.",meathodParms:[]},{meathodName:"GetRecTableId",meathodDescription:`inherited -> AppRecord
Returns the calling AppRecord's table ID.`,meathodReturn:"int",meathodReturnDescription:"The calling AppRecord's table ID.",meathodParms:[]},{meathodName:"GetSchemaColumns",meathodDescription:`inherited -> AppRecord
Returns a Vector of SchemaColumn objects. Will not include fields for VarRecord or
ProjectBasedRecord objects.`,meathodReturn:"Vector",meathodReturnDescription:`Each entry will be a SchemaColumn object representing a column in
the database that this item can interact with.`,meathodParms:[]},{meathodName:"HasVariableDBFields",meathodDescription:`inherited -> AppRecord
Tests whether the calling AppRecord is from a table with variable fields.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the calling AppRecord's table has variable fields.",meathodParms:[]},{meathodName:"IsFieldEqual",meathodDescription:`inherited -> AppRecord
Tests for equivalence between the specified field and a value formatted as a string.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the field is found and is equal; false otherwise.",meathodParms:[{name:"fieldNameOrId",type:["int","string"],description:`If a non-numeric string, the name of the field to be tested.
Otherwise, it is converted to a number and taken as the
TS_ID of the field to be tested.`,optional:!1},{name:"value",type:"string",description:`The value to be compared to. The field's value will be
formatted as a string and compared to this value.`,optional:!1}]},{meathodName:"IsLocked",meathodDescription:`inherited -> AppRecord
Tests whether the calling AppRecord has been locked, meaning it is in use by another
user.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record is locked by another user.",meathodParms:[{name:"lockedByThisUser",type:"bool",description:`Without an input parameter ( or with "false" as the input ),
IsLocked() means "Does someone else have this record
locked?"
With "true" as the input parameter, the meaning is "May I
(as the current user) update this record?"`,optional:!0}]},{meathodName:"Lock",meathodDescription:`inherited -> AppRecord
Locks the calling AppRecord, so other users will not attempt
to update it.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record is locked by another user.",meathodParms:[{name:"stealLock",type:"bool",description:`Defaults to false, meaning if this item is already
locked, no lock will be established.
If true, any existing lock on this record will be broken, and
changes made by the former lock holder are lost.`,optional:!0}]},{meathodName:"Read",meathodDescription:`inherited -> AppRecord
Looks up a row in the AppRecord's table`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the TS_ID or name was found, in which case the
calling AppRecord object becomes a copy of that row in the table.`,meathodParms:[{name:"recordIdOrName",type:["int","string"],description:`If this is an int or string that SBM ModScript can convert to
an int, it is taken as the value to search for in the TS_ID
column. All other parameter types are converted to a string
and searched for in the Name system field.`,optional:!1}]},{meathodName:"ReadWithWhere",meathodDescription:`inherited -> AppRecord
Used to find a record by passing in a string containing a SQL
"where" clause, not including the keyword "where".`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the method found the record, in which case the calling
object becomes a copy of the record found. If more than one record
is found, the first one is copied to the calling object.`,meathodParms:[{name:"whereClause",type:"string",description:`The SQL "where" clause to find the specific record in the
table, not including the keyword "where".`,optional:!1},{name:"queryParams",type:"Vector",description:`queryParams is an optional Vector storing SQL bind
parameters, where each entry is a Pair, where the first value
is the parameter type and the second value is the value to
bind to the SQL parameter. See Pair, Map_Pair, and
Dictionary_Pair [page 123].
For the type parameter, use DBTypeConstants [page 347].`,optional:!0}]},{meathodName:"ReadByColumn",meathodDescription:`inherited -> AppRecord
Reads any record type by a column value`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the item is read successfully; false if the item is not
found.`,meathodParms:[{name:"columnName",type:"string",description:"The database name of the column without the TS_ prefix.",optional:!1},{name:"value",type:"Variant",description:`Behavior depends on the Variant internal type:
\u2022 string \u2013 ReadByColumn() will succeed if the column is a
text column.
\u2022 int, int64_t, short, byte, or bool \u2013 ReadByColumn() will
succeed if the column is an integer column.
\u2022 float or double \u2013 ReadByColumn() will succeed if the
column is a floating point column.`,optional:!1}]},{meathodName:"ReadByColumnAndColumn",meathodDescription:`inherited -> AppRecord
Reads any record type by two column values`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the item is read successfully; false if the item is not
found.`,meathodParms:[{name:"columnName",type:"string",description:'The name of the column without the "TS_" prefix',optional:!1},{name:"value",type:"Variant",description:`Value must be an int, int64_t, short, byte, bool, or string
that can be converted to an int.`,optional:!1},{name:"column2Name",type:"string",description:'The name of the second column without the "TS_" prefix.',optional:!1},{name:"value2",type:"Variant",description:`Behavior depends on the Variant internal type:
\u2022 string \u2013 ReadByColumn() will succeed if the column is a
text column.
\u2022 int, int64_t, short, byte, or bool \u2013 ReadByColumn() will
succeed if the column is an integer column.
\u2022 float or double \u2013 Not supported.`,optional:!1}]},{meathodName:"ReadByUUID",meathodDescription:`inherited -> AppRecord
Reads the item using the UUID column, if it exists.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the record was found, in which case the
calling AppRecord object becomes a copy of that row in the table.`,meathodParms:[{name:"itemUUID",type:"string",description:"The UUID value that is passed in.",optional:!1}]},{meathodName:"SetFieldValue",meathodDescription:`inherited -> AppRecord
Sets the value of any column.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the column value was successfully set; false
otherwise.`,meathodParms:[{name:"name",type:"string",description:`The name of the column whose value will be set in the
AppRecord schema.`,optional:!1},{name:"value",type:["int","string","int64_t","double","TimeT","Variant"],description:`The new value for the column. The value
must be specified as it is stored in the database. For
example, for integer columns that are a foreign key to the
TS_USERS table, the value must be the database ID for
the user. TimeT values should only be used with columns
that represent dates, either as a native database date or
as a integer that represents dates in Unix Epoch time
format.`,optional:!1}]},{meathodName:"SetName",meathodDescription:`inherited -> AppRecord
Sets the "name" value of the calling object.`,meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"newName",type:"string",description:"Text to be used as the new name for the item.",optional:!1}]},{meathodName:"Unlock",meathodDescription:`inherited -> AppRecord
Unlocks the calling AppRecord, signaling that it is available
for other users.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the record was successfully unlocked or was not
locked to begin with.`,meathodParms:[{name:"currentUserOnly",type:"bool",description:`Defaults to false. If true, only the current user's
lock is unlocked. If false, any user's lock on this record is
removed.`,optional:!0}]},{meathodName:"Update",meathodDescription:`inherited -> AppRecord
This method updates the item in the database using the
values from the item.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record is updated in the database.",meathodParms:[]},{meathodName:"UpdateWithLock",meathodDescription:`inherited -> AppRecord
Updates the record that has been previously locked with
Lock() function.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record was successfully updated; false otherwise.",meathodParms:[{name:"stealLock",type:"bool",description:`Optional parameter that allows the user to skip the Lock()
function and steal the lock during the update. Defaults to
false. If true, any other user's existing lock will be broken,
causing that user's changes to be lost.`,optional:!0}]}],properties:[],inheritsDone:!0},SchemaColumn:{className:"SchemaColumn",exposed:!1,inheritsFrom:"",classDescription:`Provides information about columns for AppRecord.GetSchemaColumns(). See
GetSchemaColumns() [page 171].`,meathods:[],properties:[]},Shell:{className:"Shell",exposed:!0,inheritsFrom:"",classDescription:`"Shell" is the SBM application object, like the Internet Explorer "Document." The Shell
contains all SBM data accessible to the script. It contains only properties, no methods.
These properties, plus output stream access as noted in the following table, compose the
entire interface between the SBM application and any script that it calls.`,properties:[{propertyName:"RESTTimeout",propertyDescription:`The timeout value used during REST calls. To override the default value (30
seconds), you must add a new entry to the TS_SYSTEMSETTINGS table called
DefaultRESTTimeout with TS_DATATYPE set to 1 and specify the desired timeout in the
TS_LONGVALUE column.`,propertyType:"int",readOnly:!0},{propertyName:"ScriptName",propertyDescription:`The script's name as stored in the database and shown in the Scripts
editor in SBM Composer.`,propertyType:"string",readOnly:!0},{propertyName:"ScriptId",propertyDescription:`This is the script's TS_ID. For details on the TS_ID, refer to Identifying
Records by TS_ID and Table ID [page 37].`,propertyType:"int",readOnly:!0},{propertyName:"ScriptFileName",propertyDescription:`This is the file name from which the script was most recently read and
parsed.`,propertyType:"string",readOnly:!0},{propertyName:"Context",propertyDescription:`Identifies the current context. Possible values are pre-transition, post-
transition, pre-state, post-state, HTML template, URL, notification, self registration, pre-
DbImport, post-DbImport, and RunModScript (SOAP). For details on contexts, refer to
SBM ModScript Contexts [page 27].`,propertyType:"string",readOnly:!0},{propertyName:"Db",propertyDescription:`The current SBM database object. It provides global data related to
the SBM database.`,propertyType:"AppDb",readOnly:!0},{propertyName:"RedirectURL",propertyDescription:`If the script writes a URL string to this property, the browser is redirected
there when the script exits. The server generates an HTTP 302 response containing
header values appropriate for most uses.`,propertyType:"string",readOnly:!1},{propertyName:"RedirectHTTP",propertyDescription:`If the script writes an entire HTTP response string to this property, the
browser is sent this HTTP response verbatim when the script exits. This is an advanced
feature for special situations, such as when writing cookie values into the redirect
response. Care must be taken to ensure that the HTTP string is complete, syntactically
valid, and accepted by all browsers in use.`,propertyType:"string",readOnly:!1},{propertyName:"ClientBrand",propertyDescription:`If the script writes an entire HTTP response string to this property, the
browser is sent this HTTP response verbatim when the script exits. This is an advanced
feature for special situations, such as when writing cookie values into the redirect
response. Care must be taken to ensure that the HTTP string is complete, syntactically
valid, and accepted by all browsers in use.`,propertyType:"string",readOnly:!0},{propertyName:"ClientVersion",propertyDescription:`The browser's release version. If Shell.ClientBrand() is API, this is the SBM
API version of the external program and is formatted v.r where v is the API version and r
is the API revision.`,propertyType:"string",readOnly:!0},{propertyName:"Project",propertyDescription:"The SBM project to which Shell.Item() belongs.",propertyType:"Project",readOnly:!0},{propertyName:"SolutionName",propertyDescription:`The name of the application bound to the Primary table containing
Shell.Item(). Application names are not unique.`,propertyType:"string",readOnly:!0},{propertyName:"SolutionPrefix",propertyDescription:`The prefix identifying the application bound to the Primary table containing
Shell.Item().`,propertyType:"int",readOnly:!0},{propertyName:"SolutionId",propertyDescription:`The TS_ID of the application bound to the Primary table containing
Shell.Item(). For details on the TS_ID, refer to Identifying Records by TS_ID and Table ID
[page 37].`,propertyType:"int",readOnly:!0},{propertyName:"Item",propertyDescription:`The current item in use, such as the item being
transitioned.`,propertyType:"ProjectBasedRecord",readOnly:!1},{propertyName:"ItemId",propertyDescription:"The TS_ID of the current item in use.",propertyType:"int",readOnly:!0},{propertyName:"TableId",propertyDescription:"The TS_ID of the table containing the current item.",propertyType:"int",readOnly:!0},{propertyName:"ImportAction",propertyDescription:`Specifies the operation of the data import on the current item. Possible
values are add (add a new item) and update (update an existing item).`,propertyType:"string",readOnly:!0},{propertyName:"ImportCommand",propertyDescription:`Applies a command to the currently running script. Possible values are:
\u2022 0 (Continue) \u2013 The default value, which allows the data import to continue running.
\u2022 1 (Bypass import Item) \u2013 Stops all actions on the current item and moves on to the
next item. The current item will not be added or updated if this value is set.
\u2022 2 (Kill Import) \u2013 Stops the data import for all items.`,propertyType:"int",readOnly:!1},{propertyName:"ImportID",propertyDescription:"ID of the current Import Option Set record.",propertyType:"int",readOnly:!0},{propertyName:"ImportLog",propertyDescription:`The TSLog object is a complex object used to log messages
into the DBImport log file. The logging levels defined in the TSLog object are minimal,
average, and verbose. The message function defined in the TSLog object logs messages
directly into the DbImport log using the following syntax:
Message ( Logging Level ( Int ), Message ( String ) )`,propertyType:"TSLog",readOnly:!1},{propertyName:"ImportName",propertyDescription:"Name of the current Import Option Set record.",propertyType:"string",readOnly:!0},{propertyName:"Source",propertyDescription:"",propertyType:"dictionary",readOnly:!0},{propertyName:"SourceDb",propertyDescription:"The source database object.",propertyType:"AppDB",readOnly:!0},{propertyName:"ContentType",propertyDescription:"A list of the MIME types supported by the requesting user agent.",propertyType:"string",readOnly:!0},{propertyName:"HTTPAuthorization",propertyDescription:`Contains SBM authentication information for the current request. This information is
available only if your system uses basic authentication.`,propertyType:"string",readOnly:!0},{propertyName:"HTTPCookie",propertyDescription:`Contains SBM cookie information for the current request. Cookies are returned in a
semicolon-separated list in the form "Name=Value" or "Cookie Name=Value." For details
in setting cookies using SBM ModScript, refer to Ext.SetCookie() [page 90].`,propertyType:"string",readOnly:!0},{propertyName:"HTTPUserAgent",propertyDescription:"Contains information about the user agent, including the name and version number.",propertyType:"string",readOnly:!0},{propertyName:"Referer",propertyDescription:"The URL of the referring document.",propertyType:"string",readOnly:!0},{propertyName:"RemoteAddr",propertyDescription:"The Internet Protocol (IP) address of the requesting machine.",propertyType:"string",readOnly:!0},{propertyName:"RemoteUser",propertyDescription:`The network ID of the user making the request if the user has been authenticated. This
information is only available if the user has been authenticated through NT Challenge/
Response or a similar authentication method.`,propertyType:"string",readOnly:!0},{propertyName:"RequestMethod",propertyDescription:"The HTTP request method.",propertyType:"string",readOnly:!0},{propertyName:"ServerSoftware",propertyDescription:"The name and software version of the Web server.",propertyType:"string",readOnly:!0},{propertyName:"ServerProtocol",propertyDescription:`The name and version of the protocol the request uses in the form protocol/majorVersion/
.minorVersion. For example, HTTP/1.1 may be returned.`,propertyType:"string",readOnly:!0},{propertyName:"GetLastErrorMessage",propertyDescription:"The last error message that was set",propertyType:"string",readOnly:!0},{propertyName:"PostData",propertyDescription:"The POST data from the HTTP call.",propertyType:"string",readOnly:!0},{propertyName:"LoginId",propertyDescription:`The user's login ID.
Registration shell property accessors are defined when registering a new user.`,propertyType:"string",readOnly:!0},{propertyName:"Password",propertyDescription:`The user's password.
Registration shell property accessors are defined when registering a new user.`,propertyType:"string",readOnly:!0},{propertyName:"RegistrationMethod",propertyDescription:`Indicates the registration method in use. Possible
values are manual and automatic and correspond to options available on the External
User tab of the Settings dialog box in SBM System Administrator.
Registration shell property accessors are defined when registering a new user.`,propertyType:"string",readOnly:!0},{propertyName:"Contact",propertyDescription:`A Contact record representing the new user.
Changes made to this object are stored in the database after the script exits. See
VarRecord [page 326].
Registration shell property accessors are defined when registering a new user.`,propertyType:"VarRecord",readOnly:!0},{propertyName:"Rerun",propertyDescription:`This flag is true if SBM re-runs the script because a
form is invalid. For example, a form may be rejected when a user provides invalid data or
does not provide a value for a required field. When the form re-opens for the user to
provide valid data, the script can be re-run if the Re-run Pre-transition Script if Form
Is Invalid option is enabled for the transition where the script is defined.`,propertyType:"VarRecord",readOnly:!0},{propertyName:"RedoMessage",propertyDescription:`If the script writes a non-empty string to this
property, the current operation is rejected and may be retried.
Form-based operations are rejected similarly to when required fields are missing. The user
is redirected to the same form (still maintaining any data they entered) and has another
chance to submit the form. The string in Shell.RedoMessage() is used as an error
message, appearing at the top of the form and in the Windows Event Viewer. If the script
does not write to Shell.RedoMessage(), the form is processed normally.`,propertyType:"string",readOnly:!1},{propertyName:"Params",propertyDescription:`This is a Dictionary of name/value
string pairs containing runtime parameters. These parameters typically come from HTML
templates or from URL strings. For example, when accessing the following URL:
http://server/workcenter/tmtrack.dll?ScriptPage&scriptName=myScript&x=10`,propertyType:"Dictionary",readOnly:!0},{propertyName:"TransitionName",propertyDescription:"The name of the current transition.",propertyType:"string",readOnly:!0},{propertyName:"TransitionId",propertyDescription:`The TS_ID of the current transition. For details on the
TS_ID, refer to Identifying Records by TS_ID and Table ID [page 37].`,propertyType:"int",readOnly:!0},{propertyName:"TransitionType",propertyDescription:`Identifies the type of the current transition.
Possible values are: Regular, Copy, Update, Delete, Post Item, Create Subtask, Publish
Problem, and Post to External Database.`,propertyType:"string",readOnly:!0},{propertyName:"FromStateName",propertyDescription:`The name of the state from which the transition
begins.`,propertyType:"string",readOnly:!0},{propertyName:"FromStateId",propertyDescription:`The TS_ID of the state from which the transition
begins. For details on the TS_ID, refer to Identifying Records by TS_ID and Table ID [page
37].`,propertyType:"int",readOnly:!0},{propertyName:"ToStateName",propertyDescription:` The name of the state to which the item is
transitioned.`,propertyType:"string",readOnly:!0},{propertyName:"ToStateId",propertyDescription:`The TS_ID of the state to which the transition travels.
For details on the TS_ID, refer to Identifying Records by TS_ID and Table ID [page 37].`,propertyType:"int",readOnly:!0},{propertyName:"MassTransPreForm",propertyDescription:`Detects if a pre-transition script is running while the
mass transition form is being initiated.`,propertyType:"bool",readOnly:!0},{propertyName:"URLProtocol",propertyDescription:" Returns http or https.",propertyType:"string",readOnly:!0},{propertyName:"URLServer",propertyDescription:"Returns the server name for the current URL.",propertyType:"string",readOnly:!0},{propertyName:"URLPort",propertyDescription:`Returns the TCP/IP port for the current URL (often
omitted, defaults to 80).`,propertyType:"string",readOnly:!0},{propertyName:"URLPath",propertyDescription:"Returns /tmtrack/tmtrack.dll.",propertyType:"string",readOnly:!0},{propertyName:"URLQuery",propertyDescription:"Returns ScriptPage&ScriptName=myScript.",propertyType:"string",readOnly:!0},{propertyName:"User",propertyDescription:`The "current user" for the script and is always the
logged-in user, except when used with the Notification context. In the Notification
context, the script is executed once per subscriber, with Shell.User() referring to the
subscriber being processed. If there are no subscribers, the script is executed one time
with Shell.User() equal to the value Nothing. See User [page 318].`,propertyType:"User",readOnly:!0},{propertyName:"UserToken",propertyDescription:"Returns the user's SSO token in Base64-encoded format.",propertyType:"string",readOnly:!0},{propertyName:"IsActingAsAnotherUser",propertyDescription:"Returns true if the user is currently being impersonated.",propertyType:"bool",readOnly:!0},{propertyName:"ActingAsAnotherUserID",propertyDescription:` If the shell context has a User property, and if the user is being
impersonated, this returns the actual user's ID.`,propertyType:"int",readOnly:!0},{propertyName:"NamespacePrefix",propertyDescription:` Returns the namespace table prefixes for the user (this prefix is added
to the dbname of every primary and auxiliary table when a process app is deployed to a
namespace).`,propertyType:"string",readOnly:!0},{propertyName:"NamespaceID",propertyDescription:"Returns the user's namespace ID.",propertyType:"int",readOnly:!0}],meathods:[{meathodName:"SetLastErrorMessage",meathodDescription:"Sets Last Error Message",meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"Error",type:"string",description:"The error message to set",optional:!1}]},{meathodName:"ClearLastErrorMessage",meathodDescription:"Clears the last error message",meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[]}]},SQLColumnDef:{className:"SQLColumnDef",exposed:!1,inheritsFrom:"",classDescription:"Provides information about a single column. See also AppDB.ReadDynaSQL.",meathods:[],properties:[]},TempFile:{className:"TempFile",exposed:!1,inheritsFrom:"",classDescription:`A class that creates a temporary file that exists for the scope of the object. This can be
used in conjunction with executing a command-line executable or PowerShell script that
needs to write output to a file.`,meathods:[],properties:[]},TimeMillis:{className:"TimeMillis",exposed:!1,inheritsFrom:"",classDescription:"Stores a point in time as milliseconds in UnixEpoch format.",meathods:[],properties:[]},TimePoint:{className:"TimePoint",exposed:!1,inheritsFrom:"",classDescription:"Provides a breakdown of a point in time based on a time zone.",meathods:[],properties:[]},TimeT:{className:"TimeT",exposed:!1,inheritsFrom:"",classDescription:"Stores a point in time as seconds in UnixEpoch format.",meathods:[{meathodName:"ParseDateText",meathodDescription:"Parses a human-readable date string into a TimeT using built-in date formats.",meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"value",type:"string",description:`Optional. Defaults to true if not supplied. The value to which
all Fields' select flags will be set.`,optional:!1},{name:"attrib",type:"int",description:"See DateTimeAttributeConstants [page 347] for values",optional:!1}]},{meathodName:"ParseDateText",meathodDescription:"Parses a human-readable date string into a TimeT using built-in date formats.",meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"value",type:"string",description:`Optional. Defaults to true if not supplied. The value to which
all Fields' select flags will be set.`,optional:!1},{name:"attrib",type:"int",description:"See DateTimeAttributeConstants [page 347] for values",optional:!1},{name:"tz",type:"TimeZone",description:`The time zone used to determine the point in time
represented by the text. If not provided, the current
user's time zone is used.`,optional:!1},{name:"loc",type:"Locale",description:`The locale used during parsing. Especially important if
dateformat is set to DateFormatConstants.FROM_LOCALE.
Helps identify keywords such as "AM" and "PM".`,optional:!1},{name:"dateformat",type:"int",description:"The date format. See DateFormatConstants [page 345].",optional:!1},{name:"timeformat",type:"int",description:`The time format. See TimeFormatConstants [page 355].
Ignored if dateformat is
DateFormatConstants.FROM_LOCALE.`,optional:!1}]},{meathodName:"ParseDateText",meathodDescription:"Parses a human-readable date string into a TimeT using a custom format.",meathodReturn:"bool",meathodReturnDescription:"Returns true if date parsing was successful.",meathodParms:[{name:"value",type:"string",description:"The text to parse.",optional:!1},{name:"format",type:"string",description:`Optional. Defaults to true if not supplied. The value to which
all Fields' select flags will be set.`,optional:!1}]},{meathodName:"ParseDateText",meathodDescription:"Parses a human-readable date string into a TimeT using a custom format.",meathodReturn:"bool",meathodReturnDescription:"Returns true if date parsing was successful.",meathodParms:[{name:"value",type:"string",description:"The text to parse.",optional:!1},{name:"format",type:"string",description:`Optional. Defaults to true if not supplied. The value to which
all Fields' select flags will be set.`,optional:!1},{name:"tz",type:"TimeZone",description:`Timezone used to determine the point in time
represented by the text. If not provided, the current
user's timezone is used.`,optional:!1},{name:"loc",type:"Locale",description:`Locale used during parsing. Especially important if
dateformat is set to DateFormatConstants.FROM_LOCALE.
Helps identify keywords such as "AM", "PM", month
names, etc.`,optional:!1}]},{meathodName:"FormatDateText",meathodDescription:"Formats a date into a human-readable string using built-in date formats.",meathodReturn:"string",meathodReturnDescription:"The date in human-readable text format.",meathodParms:[{name:"attrib",type:"int",description:"See DateTimeAttributeConstants [page 347] for values",optional:!1}]},{meathodName:"FormatDateText",meathodDescription:"Formats a date into a human-readable string using built-in date formats.",meathodReturn:"string",meathodReturnDescription:"The date in human-readable text format.",meathodParms:[{name:"attrib",type:"int",description:"See DateTimeAttributeConstants [page 347] for values",optional:!1},{name:"tz",type:"TimeZone",description:`The time zone used to determine the point in time
represented by the text. If not provided, the current
user's time zone is used.`,optional:!1},{name:"loc",type:"Locale",description:`The locale used during parsing. Especially important if
dateformat is set to DateFormatConstants.FROM_LOCALE.
Helps identify keywords such as "AM" and "PM".`,optional:!1},{name:"dateformat",type:"int",description:"The date format. See DateFormatConstants [page 345].",optional:!1},{name:"timeformat",type:"int",description:`The time format. See TimeFormatConstants [page 355].
Ignored if dateformat is
DateFormatConstants.FROM_LOCALE.`,optional:!1},{name:"dateFormatPref",type:"int",description:`See DateFormatFromLocaleConstants [page 346]. Only
used when dateformat is set to
DateFormatConstants.FROM_LOCALE. Indicates whether
to use the terse or verbose format of the locale. If not
provided, the current user's preference is used.`,optional:!1}]},{meathodName:"FormatDateText",meathodDescription:"Formats a date into a human-readable string using a custom date format.",meathodReturn:"string",meathodReturnDescription:"The date in human-readable text format.",meathodParms:[{name:"format",type:"string",description:`A string with symbols and literals.
Format value is a string with symbols and literals (literals can be escaped inside single tick
( ' ) values if necessary). Symbols are described in ICU documentation. When formatting,
the number of times a symbol occurs determines the length of values during output. For
instance, "M" will output January as "1", but "MM" will output January as "01". When
parsing, it is often best to provide the simplest option "M", which will work with both "1"
and "01". Keep in mind that TimeT is measured in seconds, therefore millisecond values
will always be zero.`,optional:!1}]},{meathodName:"FormatDateText",meathodDescription:"Formats a date into a human-readable string using a custom date format.",meathodReturn:"string",meathodReturnDescription:"The date in human-readable text format.",meathodParms:[{name:"format",type:"string",description:`A string with symbols and literals.
Format value is a string with symbols and literals (literals can be escaped inside single tick
( ' ) values if necessary). Symbols are described in ICU documentation. When formatting,
the number of times a symbol occurs determines the length of values during output. For
instance, "M" will output January as "1", but "MM" will output January as "01". When
parsing, it is often best to provide the simplest option "M", which will work with both "1"
and "01". Keep in mind that TimeT is measured in seconds, therefore millisecond values
will always be zero.`,optional:!1},{name:"tz",type:"TimeZone",description:`The time zone used to convert the point in time
represented by the TimeT to text. If not provided, the
current user's timezone is used.`,optional:!1},{name:"loc",type:"Locale",description:`Locale used during formatting. Especially important if
dateformat is set to DateFormatConstants.FROM_LOCALE.
Indicates language to use for keywords such as "AM",
"PM", month names, day of week names, etc.`,optional:!1}]},{meathodName:"ToTimePoint",meathodDescription:`Resolves date into a TimePoint that represents year/month/day/etc. based on the
specified TimeZone.`,meathodReturn:"TimePoint",meathodReturnDescription:`A breakdown of the fields in a date (year, month, day, etc.)
See TimePoint [page 294].`,meathodParms:[{name:"tz",type:"TimeZone",description:`The time zone used to convert the point in time
represented by the TimeT to the TimePoint.`,optional:!1}]},{meathodName:"Add",meathodDescription:"Adds or subtracts to date using TimeZone rules (to subtract use negative values).",meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"tz",type:"TimeZone",description:`The time zone used to determine the point in time
represented by the text. If not provided, the current
user's timezone is used.`,optional:!1},{name:"years",type:"int",description:`The number of years to add or subtract from the current
date. (Use negative values to subtract).`,optional:!1},{name:"months",type:"int",description:`The number of months to add or subtract from the current
date. (Use negative values to subtract).`,optional:!1},{name:"days",type:"int",description:`The number of days to add or subtract from the current
date. (Use negative values to subtract).`,optional:!1},{name:"hours",type:"int",description:`The number of hours to add or subtract from the current
date. (Use negative values to subtract).`,optional:!1},{name:"minutes",type:"int",description:`The number of minutes to add or subtract from the current
date. (Use negative values to subtract).`,optional:!1},{name:"seconds",type:"int",description:`The number of seconds to add or subtract from the current
date. (Use negative values to subtract).`,optional:!1}]},{meathodName:"TruncateToDateOnly",meathodDescription:"Rounds date down to midnight UTC.",meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[]},{meathodName:"ToVariant",meathodDescription:"Rounds date down to midnight UTC.",meathodReturn:"Variant",meathodReturnDescription:"Variant that internally represents the date.",meathodParms:[]}],properties:[{propertyName:"date",propertyDescription:"Number of seconds since midnight 1/1/1970 UTC (GMT).",propertyType:"int",readOnly:!0}]},TimeZone:{className:"TimeZone",exposed:!1,inheritsFrom:"",classDescription:`Provides functions that create a TimeZone. You can create a TimeZone for the user you
are acting as, or you use the UTC TimeZone, or a TimeZone delineating string.`,meathods:[],properties:[]},Transition:{className:"Transition",exposed:!1,inheritsFrom:"AppRecord",classDescription:"Identifies the type of transition.",meathods:[{meathodName:"Add",meathodDescription:`inherited -> AppRecord
This method adds a new row to a table. After creating an AppRecord from
the desired table and setting any desired field values, use this method to add the
record as a new row in its table. This is not for use with Primary tables, because
those items must go through a Submit transition. However, it is possible to make a
copy of a Primary table item using this method.`,meathodReturn:"int",meathodReturnDescription:`The TS_ID of the record added, which is unique to this table.
Zero means the record could not be added due to an error.`,meathodParms:[]},{meathodName:"Delete",meathodDescription:`inherited -> AppRecord
On most tables, this method removes the record from the database. On
tables such as States and Users, the records are marked as deleted but remain in
the database.`,meathodReturn:"bool",meathodReturnDescription:`True if the record is deleted from or marked as deleted in the
database.`,meathodParms:[]},{meathodName:"Fields",meathodDescription:`inherited -> AppRecord
Returns a VarFieldList containing all fields for a VarRecord.`,meathodReturn:"VarFieldList",meathodReturnDescription:`The list of fields from this AppRecord. If there is no FieldList for this
record, this method returns null. Use is_var_null() to check for
null.`,meathodParms:[]},{meathodName:"GetDisplayName",meathodDescription:`inherited -> AppRecord
Returns the display name of a record.`,meathodReturn:"string",meathodReturnDescription:"This record's display name, formatted according to table settings.",meathodParms:[]},{meathodName:"GetFieldValue",meathodDescription:`inherited -> AppRecord
Gets the value of any field.`,meathodReturn:"Variant",meathodReturnDescription:`The internal value for a field or column.
For Text fields, this is the exact value entered in the field;
for selection fields, the value is the database ID for the
selection. For values that are not Variant or TimeT, this
internally gets the value from the field as a Variant, and
then tries to convert the value to the requested type.
TimeT can be used with Date/Time fields to get the
internal date value.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueString",meathodDescription:`inherited -> AppRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"string",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueInt",meathodDescription:`inherited -> AppRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"int",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueInt64",meathodDescription:`inherited -> AppRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"int64_t",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueDouble",meathodDescription:`inherited -> AppRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"double",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueTimeT",meathodDescription:`inherited -> AppRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"TimeT",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetId",meathodDescription:`inherited -> AppRecord
Retrieves the current AppRecord's TS_ID.`,meathodReturn:"int",meathodReturnDescription:"TS_ID of the calling AppRecord.",meathodParms:[]},{meathodName:"GetUUID",meathodDescription:`inherited -> AppRecord
Returns the item's UUID, if applicable.`,meathodReturn:"string",meathodReturnDescription:"The item's UUID.",meathodParms:[]},{meathodName:"GetName",meathodDescription:`inherited -> AppRecord
Gets the calling AppRecord's "Name" system field.`,meathodReturn:"string",meathodReturnDescription:"A text string from the associated Name field.",meathodParms:[]},{meathodName:"GetRecTableId",meathodDescription:`inherited -> AppRecord
Returns the calling AppRecord's table ID.`,meathodReturn:"int",meathodReturnDescription:"The calling AppRecord's table ID.",meathodParms:[]},{meathodName:"GetSchemaColumns",meathodDescription:`inherited -> AppRecord
Returns a Vector of SchemaColumn objects. Will not include fields for VarRecord or
ProjectBasedRecord objects.`,meathodReturn:"Vector",meathodReturnDescription:`Each entry will be a SchemaColumn object representing a column in
the database that this item can interact with.`,meathodParms:[]},{meathodName:"HasVariableDBFields",meathodDescription:`inherited -> AppRecord
Tests whether the calling AppRecord is from a table with variable fields.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the calling AppRecord's table has variable fields.",meathodParms:[]},{meathodName:"IsFieldEqual",meathodDescription:`inherited -> AppRecord
Tests for equivalence between the specified field and a value formatted as a string.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the field is found and is equal; false otherwise.",meathodParms:[{name:"fieldNameOrId",type:["int","string"],description:`If a non-numeric string, the name of the field to be tested.
Otherwise, it is converted to a number and taken as the
TS_ID of the field to be tested.`,optional:!1},{name:"value",type:"string",description:`The value to be compared to. The field's value will be
formatted as a string and compared to this value.`,optional:!1}]},{meathodName:"IsLocked",meathodDescription:`inherited -> AppRecord
Tests whether the calling AppRecord has been locked, meaning it is in use by another
user.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record is locked by another user.",meathodParms:[{name:"lockedByThisUser",type:"bool",description:`Without an input parameter ( or with "false" as the input ),
IsLocked() means "Does someone else have this record
locked?"
With "true" as the input parameter, the meaning is "May I
(as the current user) update this record?"`,optional:!0}]},{meathodName:"Lock",meathodDescription:`inherited -> AppRecord
Locks the calling AppRecord, so other users will not attempt
to update it.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record is locked by another user.",meathodParms:[{name:"stealLock",type:"bool",description:`Defaults to false, meaning if this item is already
locked, no lock will be established.
If true, any existing lock on this record will be broken, and
changes made by the former lock holder are lost.`,optional:!0}]},{meathodName:"Read",meathodDescription:`inherited -> AppRecord
Looks up a row in the AppRecord's table`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the TS_ID or name was found, in which case the
calling AppRecord object becomes a copy of that row in the table.`,meathodParms:[{name:"recordIdOrName",type:["int","string"],description:`If this is an int or string that SBM ModScript can convert to
an int, it is taken as the value to search for in the TS_ID
column. All other parameter types are converted to a string
and searched for in the Name system field.`,optional:!1}]},{meathodName:"ReadWithWhere",meathodDescription:`inherited -> AppRecord
Used to find a record by passing in a string containing a SQL
"where" clause, not including the keyword "where".`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the method found the record, in which case the calling
object becomes a copy of the record found. If more than one record
is found, the first one is copied to the calling object.`,meathodParms:[{name:"whereClause",type:"string",description:`The SQL "where" clause to find the specific record in the
table, not including the keyword "where".`,optional:!1},{name:"queryParams",type:"Vector",description:`queryParams is an optional Vector storing SQL bind
parameters, where each entry is a Pair, where the first value
is the parameter type and the second value is the value to
bind to the SQL parameter. See Pair, Map_Pair, and
Dictionary_Pair [page 123].
For the type parameter, use DBTypeConstants [page 347].`,optional:!0}]},{meathodName:"ReadByColumn",meathodDescription:`inherited -> AppRecord
Reads any record type by a column value`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the item is read successfully; false if the item is not
found.`,meathodParms:[{name:"columnName",type:"string",description:"The database name of the column without the TS_ prefix.",optional:!1},{name:"value",type:"Variant",description:`Behavior depends on the Variant internal type:
\u2022 string \u2013 ReadByColumn() will succeed if the column is a
text column.
\u2022 int, int64_t, short, byte, or bool \u2013 ReadByColumn() will
succeed if the column is an integer column.
\u2022 float or double \u2013 ReadByColumn() will succeed if the
column is a floating point column.`,optional:!1}]},{meathodName:"ReadByColumnAndColumn",meathodDescription:`inherited -> AppRecord
Reads any record type by two column values`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the item is read successfully; false if the item is not
found.`,meathodParms:[{name:"columnName",type:"string",description:'The name of the column without the "TS_" prefix',optional:!1},{name:"value",type:"Variant",description:`Value must be an int, int64_t, short, byte, bool, or string
that can be converted to an int.`,optional:!1},{name:"column2Name",type:"string",description:'The name of the second column without the "TS_" prefix.',optional:!1},{name:"value2",type:"Variant",description:`Behavior depends on the Variant internal type:
\u2022 string \u2013 ReadByColumn() will succeed if the column is a
text column.
\u2022 int, int64_t, short, byte, or bool \u2013 ReadByColumn() will
succeed if the column is an integer column.
\u2022 float or double \u2013 Not supported.`,optional:!1}]},{meathodName:"ReadByUUID",meathodDescription:`inherited -> AppRecord
Reads the item using the UUID column, if it exists.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the record was found, in which case the
calling AppRecord object becomes a copy of that row in the table.`,meathodParms:[{name:"itemUUID",type:"string",description:"The UUID value that is passed in.",optional:!1}]},{meathodName:"SetFieldValue",meathodDescription:`inherited -> AppRecord
Sets the value of any column.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the column value was successfully set; false
otherwise.`,meathodParms:[{name:"name",type:"string",description:`The name of the column whose value will be set in the
AppRecord schema.`,optional:!1},{name:"value",type:["int","string","int64_t","double","TimeT","Variant"],description:`The new value for the column. The value
must be specified as it is stored in the database. For
example, for integer columns that are a foreign key to the
TS_USERS table, the value must be the database ID for
the user. TimeT values should only be used with columns
that represent dates, either as a native database date or
as a integer that represents dates in Unix Epoch time
format.`,optional:!1}]},{meathodName:"SetName",meathodDescription:`inherited -> AppRecord
Sets the "name" value of the calling object.`,meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"newName",type:"string",description:"Text to be used as the new name for the item.",optional:!1}]},{meathodName:"Unlock",meathodDescription:`inherited -> AppRecord
Unlocks the calling AppRecord, signaling that it is available
for other users.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the record was successfully unlocked or was not
locked to begin with.`,meathodParms:[{name:"currentUserOnly",type:"bool",description:`Defaults to false. If true, only the current user's
lock is unlocked. If false, any user's lock on this record is
removed.`,optional:!0}]},{meathodName:"Update",meathodDescription:`inherited -> AppRecord
This method updates the item in the database using the
values from the item.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record is updated in the database.",meathodParms:[]},{meathodName:"UpdateWithLock",meathodDescription:`inherited -> AppRecord
Updates the record that has been previously locked with
Lock() function.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record was successfully updated; false otherwise.",meathodParms:[{name:"stealLock",type:"bool",description:`Optional parameter that allows the user to skip the Lock()
function and steal the lock during the update. Defaults to
false. If true, any other user's existing lock will be broken,
causing that user's changes to be lost.`,optional:!0}]}],properties:[],inheritsDone:!0},TreeItem:{className:"TreeItem",exposed:!1,inheritsFrom:"AppRecord",classDescription:`TreeItem is an object type for internal use and supports the concept of hierarchical
relationships ("trees"). Nested objects, such as projects, workflows, and folders inherit
from TreeItem so they can support the following methods. TreeItem objects are never
merely of type TreeItem; they must be a subtype of TreeItem.`,meathods:[{meathodName:"Add",meathodDescription:`inherited -> AppRecord
This method adds a new row to a table. After creating an AppRecord from
the desired table and setting any desired field values, use this method to add the
record as a new row in its table. This is not for use with Primary tables, because
those items must go through a Submit transition. However, it is possible to make a
copy of a Primary table item using this method.`,meathodReturn:"int",meathodReturnDescription:`The TS_ID of the record added, which is unique to this table.
Zero means the record could not be added due to an error.`,meathodParms:[]},{meathodName:"Delete",meathodDescription:`inherited -> AppRecord
On most tables, this method removes the record from the database. On
tables such as States and Users, the records are marked as deleted but remain in
the database.`,meathodReturn:"bool",meathodReturnDescription:`True if the record is deleted from or marked as deleted in the
database.`,meathodParms:[]},{meathodName:"Fields",meathodDescription:`inherited -> AppRecord
Returns a VarFieldList containing all fields for a VarRecord.`,meathodReturn:"VarFieldList",meathodReturnDescription:`The list of fields from this AppRecord. If there is no FieldList for this
record, this method returns null. Use is_var_null() to check for
null.`,meathodParms:[]},{meathodName:"GetDisplayName",meathodDescription:`inherited -> AppRecord
Returns the display name of a record.`,meathodReturn:"string",meathodReturnDescription:"This record's display name, formatted according to table settings.",meathodParms:[]},{meathodName:"GetFieldValue",meathodDescription:`inherited -> AppRecord
Gets the value of any field.`,meathodReturn:"Variant",meathodReturnDescription:`The internal value for a field or column.
For Text fields, this is the exact value entered in the field;
for selection fields, the value is the database ID for the
selection. For values that are not Variant or TimeT, this
internally gets the value from the field as a Variant, and
then tries to convert the value to the requested type.
TimeT can be used with Date/Time fields to get the
internal date value.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueString",meathodDescription:`inherited -> AppRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"string",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueInt",meathodDescription:`inherited -> AppRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"int",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueInt64",meathodDescription:`inherited -> AppRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"int64_t",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueDouble",meathodDescription:`inherited -> AppRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"double",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueTimeT",meathodDescription:`inherited -> AppRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"TimeT",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetId",meathodDescription:`inherited -> AppRecord
Retrieves the current AppRecord's TS_ID.`,meathodReturn:"int",meathodReturnDescription:"TS_ID of the calling AppRecord.",meathodParms:[]},{meathodName:"GetUUID",meathodDescription:`inherited -> AppRecord
Returns the item's UUID, if applicable.`,meathodReturn:"string",meathodReturnDescription:"The item's UUID.",meathodParms:[]},{meathodName:"GetName",meathodDescription:`inherited -> AppRecord
Gets the calling AppRecord's "Name" system field.`,meathodReturn:"string",meathodReturnDescription:"A text string from the associated Name field.",meathodParms:[]},{meathodName:"GetRecTableId",meathodDescription:`inherited -> AppRecord
Returns the calling AppRecord's table ID.`,meathodReturn:"int",meathodReturnDescription:"The calling AppRecord's table ID.",meathodParms:[]},{meathodName:"GetSchemaColumns",meathodDescription:`inherited -> AppRecord
Returns a Vector of SchemaColumn objects. Will not include fields for VarRecord or
ProjectBasedRecord objects.`,meathodReturn:"Vector",meathodReturnDescription:`Each entry will be a SchemaColumn object representing a column in
the database that this item can interact with.`,meathodParms:[]},{meathodName:"HasVariableDBFields",meathodDescription:`inherited -> AppRecord
Tests whether the calling AppRecord is from a table with variable fields.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the calling AppRecord's table has variable fields.",meathodParms:[]},{meathodName:"IsFieldEqual",meathodDescription:`inherited -> AppRecord
Tests for equivalence between the specified field and a value formatted as a string.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the field is found and is equal; false otherwise.",meathodParms:[{name:"fieldNameOrId",type:["int","string"],description:`If a non-numeric string, the name of the field to be tested.
Otherwise, it is converted to a number and taken as the
TS_ID of the field to be tested.`,optional:!1},{name:"value",type:"string",description:`The value to be compared to. The field's value will be
formatted as a string and compared to this value.`,optional:!1}]},{meathodName:"IsLocked",meathodDescription:`inherited -> AppRecord
Tests whether the calling AppRecord has been locked, meaning it is in use by another
user.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record is locked by another user.",meathodParms:[{name:"lockedByThisUser",type:"bool",description:`Without an input parameter ( or with "false" as the input ),
IsLocked() means "Does someone else have this record
locked?"
With "true" as the input parameter, the meaning is "May I
(as the current user) update this record?"`,optional:!0}]},{meathodName:"Lock",meathodDescription:`inherited -> AppRecord
Locks the calling AppRecord, so other users will not attempt
to update it.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record is locked by another user.",meathodParms:[{name:"stealLock",type:"bool",description:`Defaults to false, meaning if this item is already
locked, no lock will be established.
If true, any existing lock on this record will be broken, and
changes made by the former lock holder are lost.`,optional:!0}]},{meathodName:"Read",meathodDescription:`inherited -> AppRecord
Looks up a row in the AppRecord's table`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the TS_ID or name was found, in which case the
calling AppRecord object becomes a copy of that row in the table.`,meathodParms:[{name:"recordIdOrName",type:["int","string"],description:`If this is an int or string that SBM ModScript can convert to
an int, it is taken as the value to search for in the TS_ID
column. All other parameter types are converted to a string
and searched for in the Name system field.`,optional:!1}]},{meathodName:"ReadWithWhere",meathodDescription:`inherited -> AppRecord
Used to find a record by passing in a string containing a SQL
"where" clause, not including the keyword "where".`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the method found the record, in which case the calling
object becomes a copy of the record found. If more than one record
is found, the first one is copied to the calling object.`,meathodParms:[{name:"whereClause",type:"string",description:`The SQL "where" clause to find the specific record in the
table, not including the keyword "where".`,optional:!1},{name:"queryParams",type:"Vector",description:`queryParams is an optional Vector storing SQL bind
parameters, where each entry is a Pair, where the first value
is the parameter type and the second value is the value to
bind to the SQL parameter. See Pair, Map_Pair, and
Dictionary_Pair [page 123].
For the type parameter, use DBTypeConstants [page 347].`,optional:!0}]},{meathodName:"ReadByColumn",meathodDescription:`inherited -> AppRecord
Reads any record type by a column value`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the item is read successfully; false if the item is not
found.`,meathodParms:[{name:"columnName",type:"string",description:"The database name of the column without the TS_ prefix.",optional:!1},{name:"value",type:"Variant",description:`Behavior depends on the Variant internal type:
\u2022 string \u2013 ReadByColumn() will succeed if the column is a
text column.
\u2022 int, int64_t, short, byte, or bool \u2013 ReadByColumn() will
succeed if the column is an integer column.
\u2022 float or double \u2013 ReadByColumn() will succeed if the
column is a floating point column.`,optional:!1}]},{meathodName:"ReadByColumnAndColumn",meathodDescription:`inherited -> AppRecord
Reads any record type by two column values`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the item is read successfully; false if the item is not
found.`,meathodParms:[{name:"columnName",type:"string",description:'The name of the column without the "TS_" prefix',optional:!1},{name:"value",type:"Variant",description:`Value must be an int, int64_t, short, byte, bool, or string
that can be converted to an int.`,optional:!1},{name:"column2Name",type:"string",description:'The name of the second column without the "TS_" prefix.',optional:!1},{name:"value2",type:"Variant",description:`Behavior depends on the Variant internal type:
\u2022 string \u2013 ReadByColumn() will succeed if the column is a
text column.
\u2022 int, int64_t, short, byte, or bool \u2013 ReadByColumn() will
succeed if the column is an integer column.
\u2022 float or double \u2013 Not supported.`,optional:!1}]},{meathodName:"ReadByUUID",meathodDescription:`inherited -> AppRecord
Reads the item using the UUID column, if it exists.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the record was found, in which case the
calling AppRecord object becomes a copy of that row in the table.`,meathodParms:[{name:"itemUUID",type:"string",description:"The UUID value that is passed in.",optional:!1}]},{meathodName:"SetFieldValue",meathodDescription:`inherited -> AppRecord
Sets the value of any column.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the column value was successfully set; false
otherwise.`,meathodParms:[{name:"name",type:"string",description:`The name of the column whose value will be set in the
AppRecord schema.`,optional:!1},{name:"value",type:["int","string","int64_t","double","TimeT","Variant"],description:`The new value for the column. The value
must be specified as it is stored in the database. For
example, for integer columns that are a foreign key to the
TS_USERS table, the value must be the database ID for
the user. TimeT values should only be used with columns
that represent dates, either as a native database date or
as a integer that represents dates in Unix Epoch time
format.`,optional:!1}]},{meathodName:"SetName",meathodDescription:`inherited -> AppRecord
Sets the "name" value of the calling object.`,meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"newName",type:"string",description:"Text to be used as the new name for the item.",optional:!1}]},{meathodName:"Unlock",meathodDescription:`inherited -> AppRecord
Unlocks the calling AppRecord, signaling that it is available
for other users.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the record was successfully unlocked or was not
locked to begin with.`,meathodParms:[{name:"currentUserOnly",type:"bool",description:`Defaults to false. If true, only the current user's
lock is unlocked. If false, any user's lock on this record is
removed.`,optional:!0}]},{meathodName:"Update",meathodDescription:`inherited -> AppRecord
This method updates the item in the database using the
values from the item.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record is updated in the database.",meathodParms:[]},{meathodName:"UpdateWithLock",meathodDescription:`inherited -> AppRecord
Updates the record that has been previously locked with
Lock() function.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record was successfully updated; false otherwise.",meathodParms:[{name:"stealLock",type:"bool",description:`Optional parameter that allows the user to skip the Lock()
function and steal the lock during the update. Defaults to
false. If true, any other user's existing lock will be broken,
causing that user's changes to be lost.`,optional:!0}]}],properties:[],inheritsDone:!0},TreeList:{className:"TreeList",exposed:!1,inheritsFrom:"AppRecordList",classDescription:`A TreeList is an AppRecordList that holds TreeItem objects. Typically, a TreeList is obtained
by referencing the SubList property of a TreeItem, and it represents a sub-tree of projects
or folders. The tree can be traversed using TreeItem methods.`,meathods:[{meathodName:"Count",meathodDescription:`inherited -> AppRecordList
Returns the number of items in the list.`,meathodReturn:"int",meathodReturnDescription:"The number of items in the list.",meathodParms:[]},{meathodName:"DeleteRecord",meathodDescription:`inherited -> AppRecordList
Removes the specified record from the list.`,meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"recordId",type:"int",description:"The TS_ID of the record to delete from the list.",optional:!1}]},{meathodName:"FindRecord",meathodDescription:`inherited -> AppRecordList
Find a specific record in the current list by matching its name or TS_ID.`,meathodReturn:"AppRecord",meathodReturnDescription:`The first AppRecord in the list that matches the given name or ID. If
there is no match, returns null. Use is_var_null() to check for null.`,meathodParms:[{name:"recordIdOrName",type:"Variant",description:`If this parameter is a non-numeric string, it is taken as
the desired record's name. Otherwise, it is converted to
an integer and taken as the desired record's TS_ID.`,optional:!1}]},{meathodName:"Length",meathodDescription:`inherited -> AppRecordList
Returns the number of items in the list.`,meathodReturn:"int",meathodReturnDescription:"The number of items in the list.",meathodParms:[]},{meathodName:"Read",meathodDescription:`inherited -> AppRecordList
Fills the AppRecordList from its table.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if successful; false otherwise. A successful read may
return zero results if no items match the query. Check for results by
calling the AppRecordList.empty() method.`,meathodParms:[]},{meathodName:"ReadByColumn",meathodDescription:`inherited -> AppRecordList
Reads any record list type by a column value`,meathodReturn:"bool",meathodReturnDescription:`Returns true if successful; false otherwise. A successful read may
return zero results if no items match the query. Check for results by
calling the AppRecordList.empty() method.`,meathodParms:[{name:"columnName",type:"string",description:'The name of the column without the "TS_" prefix.',optional:!1},{name:"value",type:"Variant",description:`Behavior depends on the Variant internal type:
\u2022 string \u2013 ReadByColumn() will succeed if the column is a
text column.
\u2022 int, int64_t, short, byte, or bool \u2013 ReadByColumn() will
succeed if the column is an integer column.
\u2022 float or double \u2013 ReadByColumn() will succeed if the
column is a floating point column.`,optional:!1}]},{meathodName:"ReadByColumnAndColumn",meathodDescription:`inherited -> AppRecordList
Reads any record list type by two column values.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if successful; false otherwise. A successful read may
return zero results if no items match the query. Check for results by
calling the AppRecordList.empty() method.`,meathodParms:[{name:"columnName",type:"string",description:'The name of the column without the "TS_" prefix',optional:!1},{name:"value",type:"Variant",description:`Value must be an int, int64_t, short, byte, bool, or string
that can be converted to an int.`,optional:!1},{name:"column2Name",type:"string",description:'The name of the second column without the "TS_" prefix.',optional:!1},{name:"value2",type:"Variant",description:`Behavior depends on the Variant internal type:
\u2022 string \u2013 ReadByColumn() will succeed if the column is a
text column.
\u2022 int, int64_t, short, byte, or bool \u2013 ReadByColumn() will
succeed if the column is an integer column.
\u2022 float or double \u2013 Not supported.`,optional:!1}]},{meathodName:"ReadWithWhere",meathodDescription:`inherited -> AppRecordList
An alternative to Read(), this method uses SQL to select
only certain records from the calling AppRecordList's table, rather than reading the entire
table.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if successful; false otherwise. A successful read may
return zero results if no items match the query. Check for results by
calling the AppRecordList.empty() method.`,meathodParms:[{name:"whereClause",type:"string",description:`A SQL "where clause" specifying the records to find. SBM
will build a SQL string requesting all fields for the calling
AppRecordList's table. The string contents of
whereClause will appear after the word "where" in this
SQL statement.`,optional:!1},{name:"params",type:"Vector",description:`Params is an optional Vector storing SQL bind
parameters, where each entry is a Pair, with the first
value as the parameter type and the second value as the
value to bind to the SQL parameter. See Pair, Map_Pair,
and Dictionary_Pair [page 123].
For the type parameter, use DBTypeConstants [page
347].`,optional:!0},{name:"orderBy",type:"string",description:`Identifies a column used for ordering the AppRecordList.
To use the templateRec parameter without the orderBy
parameter, use an empty string as a parameter for the
orderBy parameter.`,optional:!0},{name:"templateRec",type:"AppRecord",description:`Optional. Identifies which fields are read into all
AppRecords in the AppRecordList. Using this parameter
may improve performance when using AppRecordOjbects
which contain a VarFieldList from Primary or Auxiliary
tables.
To use this optional parameter, create a VarRecord
against the Primary table you are doing your
ReadWithWhere against. Get the VarFieldList of that
VarRecord through the Fields() method. Call SelectAll,
and pass it false to clear all fields. Then, explicitly turn
on the fields you wish to read by finding the Field on the
VarFieldList, and then calling that Field's Select() method
and passing it true.`,optional:!0}]},{meathodName:"clear",meathodDescription:`inherited -> AppRecordList
Removes all records from the list.`,meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[]},{meathodName:"empty",meathodDescription:`inherited -> AppRecordList
Returns true if the list is empty.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the list is empty; false if there are items in the list.",meathodParms:[]},{meathodName:"erase_at",meathodDescription:`inherited -> AppRecordList
Removes the item at specified index from the list.`,meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"index",type:"int",description:"The zero-based index of the item to remove from the list.",optional:!1}]},{meathodName:"size",meathodDescription:`inherited -> AppRecordList
Returns the number of items in the list`,meathodReturn:"size_t",meathodReturnDescription:"The number of items in the list.",meathodParms:[]},{meathodName:"Update",meathodDescription:`inherited -> AppRecordList
Perform a database update on all records in the list.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if all applicable records are successfully updated; false
otherwise.`,meathodParms:[]}],properties:[],inheritsDone:!0},UGBase:{className:"UGBase",exposed:!1,inheritsFrom:"AppRecord",classDescription:`UGBase is an object type for internal use and supports concepts useful to users and
groups. UGBase objects are never merely of type UGBase; they must be of type User. The
type Group also inherits from UGBase and is created when Ext.CreateAppRecord is
invoked using the group's table ID.`,meathods:[{meathodName:"Add",meathodDescription:`inherited -> AppRecord
This method adds a new row to a table. After creating an AppRecord from
the desired table and setting any desired field values, use this method to add the
record as a new row in its table. This is not for use with Primary tables, because
those items must go through a Submit transition. However, it is possible to make a
copy of a Primary table item using this method.`,meathodReturn:"int",meathodReturnDescription:`The TS_ID of the record added, which is unique to this table.
Zero means the record could not be added due to an error.`,meathodParms:[]},{meathodName:"Delete",meathodDescription:`inherited -> AppRecord
On most tables, this method removes the record from the database. On
tables such as States and Users, the records are marked as deleted but remain in
the database.`,meathodReturn:"bool",meathodReturnDescription:`True if the record is deleted from or marked as deleted in the
database.`,meathodParms:[]},{meathodName:"Fields",meathodDescription:`inherited -> AppRecord
Returns a VarFieldList containing all fields for a VarRecord.`,meathodReturn:"VarFieldList",meathodReturnDescription:`The list of fields from this AppRecord. If there is no FieldList for this
record, this method returns null. Use is_var_null() to check for
null.`,meathodParms:[]},{meathodName:"GetDisplayName",meathodDescription:`inherited -> AppRecord
Returns the display name of a record.`,meathodReturn:"string",meathodReturnDescription:"This record's display name, formatted according to table settings.",meathodParms:[]},{meathodName:"GetFieldValue",meathodDescription:`inherited -> AppRecord
Gets the value of any field.`,meathodReturn:"Variant",meathodReturnDescription:`The internal value for a field or column.
For Text fields, this is the exact value entered in the field;
for selection fields, the value is the database ID for the
selection. For values that are not Variant or TimeT, this
internally gets the value from the field as a Variant, and
then tries to convert the value to the requested type.
TimeT can be used with Date/Time fields to get the
internal date value.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueString",meathodDescription:`inherited -> AppRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"string",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueInt",meathodDescription:`inherited -> AppRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"int",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueInt64",meathodDescription:`inherited -> AppRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"int64_t",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueDouble",meathodDescription:`inherited -> AppRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"double",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueTimeT",meathodDescription:`inherited -> AppRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"TimeT",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetId",meathodDescription:`inherited -> AppRecord
Retrieves the current AppRecord's TS_ID.`,meathodReturn:"int",meathodReturnDescription:"TS_ID of the calling AppRecord.",meathodParms:[]},{meathodName:"GetUUID",meathodDescription:`inherited -> AppRecord
Returns the item's UUID, if applicable.`,meathodReturn:"string",meathodReturnDescription:"The item's UUID.",meathodParms:[]},{meathodName:"GetName",meathodDescription:`inherited -> AppRecord
Gets the calling AppRecord's "Name" system field.`,meathodReturn:"string",meathodReturnDescription:"A text string from the associated Name field.",meathodParms:[]},{meathodName:"GetRecTableId",meathodDescription:`inherited -> AppRecord
Returns the calling AppRecord's table ID.`,meathodReturn:"int",meathodReturnDescription:"The calling AppRecord's table ID.",meathodParms:[]},{meathodName:"GetSchemaColumns",meathodDescription:`inherited -> AppRecord
Returns a Vector of SchemaColumn objects. Will not include fields for VarRecord or
ProjectBasedRecord objects.`,meathodReturn:"Vector",meathodReturnDescription:`Each entry will be a SchemaColumn object representing a column in
the database that this item can interact with.`,meathodParms:[]},{meathodName:"HasVariableDBFields",meathodDescription:`inherited -> AppRecord
Tests whether the calling AppRecord is from a table with variable fields.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the calling AppRecord's table has variable fields.",meathodParms:[]},{meathodName:"IsFieldEqual",meathodDescription:`inherited -> AppRecord
Tests for equivalence between the specified field and a value formatted as a string.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the field is found and is equal; false otherwise.",meathodParms:[{name:"fieldNameOrId",type:["int","string"],description:`If a non-numeric string, the name of the field to be tested.
Otherwise, it is converted to a number and taken as the
TS_ID of the field to be tested.`,optional:!1},{name:"value",type:"string",description:`The value to be compared to. The field's value will be
formatted as a string and compared to this value.`,optional:!1}]},{meathodName:"IsLocked",meathodDescription:`inherited -> AppRecord
Tests whether the calling AppRecord has been locked, meaning it is in use by another
user.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record is locked by another user.",meathodParms:[{name:"lockedByThisUser",type:"bool",description:`Without an input parameter ( or with "false" as the input ),
IsLocked() means "Does someone else have this record
locked?"
With "true" as the input parameter, the meaning is "May I
(as the current user) update this record?"`,optional:!0}]},{meathodName:"Lock",meathodDescription:`inherited -> AppRecord
Locks the calling AppRecord, so other users will not attempt
to update it.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record is locked by another user.",meathodParms:[{name:"stealLock",type:"bool",description:`Defaults to false, meaning if this item is already
locked, no lock will be established.
If true, any existing lock on this record will be broken, and
changes made by the former lock holder are lost.`,optional:!0}]},{meathodName:"Read",meathodDescription:`inherited -> AppRecord
Looks up a row in the AppRecord's table`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the TS_ID or name was found, in which case the
calling AppRecord object becomes a copy of that row in the table.`,meathodParms:[{name:"recordIdOrName",type:["int","string"],description:`If this is an int or string that SBM ModScript can convert to
an int, it is taken as the value to search for in the TS_ID
column. All other parameter types are converted to a string
and searched for in the Name system field.`,optional:!1}]},{meathodName:"ReadWithWhere",meathodDescription:`inherited -> AppRecord
Used to find a record by passing in a string containing a SQL
"where" clause, not including the keyword "where".`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the method found the record, in which case the calling
object becomes a copy of the record found. If more than one record
is found, the first one is copied to the calling object.`,meathodParms:[{name:"whereClause",type:"string",description:`The SQL "where" clause to find the specific record in the
table, not including the keyword "where".`,optional:!1},{name:"queryParams",type:"Vector",description:`queryParams is an optional Vector storing SQL bind
parameters, where each entry is a Pair, where the first value
is the parameter type and the second value is the value to
bind to the SQL parameter. See Pair, Map_Pair, and
Dictionary_Pair [page 123].
For the type parameter, use DBTypeConstants [page 347].`,optional:!0}]},{meathodName:"ReadByColumn",meathodDescription:`inherited -> AppRecord
Reads any record type by a column value`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the item is read successfully; false if the item is not
found.`,meathodParms:[{name:"columnName",type:"string",description:"The database name of the column without the TS_ prefix.",optional:!1},{name:"value",type:"Variant",description:`Behavior depends on the Variant internal type:
\u2022 string \u2013 ReadByColumn() will succeed if the column is a
text column.
\u2022 int, int64_t, short, byte, or bool \u2013 ReadByColumn() will
succeed if the column is an integer column.
\u2022 float or double \u2013 ReadByColumn() will succeed if the
column is a floating point column.`,optional:!1}]},{meathodName:"ReadByColumnAndColumn",meathodDescription:`inherited -> AppRecord
Reads any record type by two column values`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the item is read successfully; false if the item is not
found.`,meathodParms:[{name:"columnName",type:"string",description:'The name of the column without the "TS_" prefix',optional:!1},{name:"value",type:"Variant",description:`Value must be an int, int64_t, short, byte, bool, or string
that can be converted to an int.`,optional:!1},{name:"column2Name",type:"string",description:'The name of the second column without the "TS_" prefix.',optional:!1},{name:"value2",type:"Variant",description:`Behavior depends on the Variant internal type:
\u2022 string \u2013 ReadByColumn() will succeed if the column is a
text column.
\u2022 int, int64_t, short, byte, or bool \u2013 ReadByColumn() will
succeed if the column is an integer column.
\u2022 float or double \u2013 Not supported.`,optional:!1}]},{meathodName:"ReadByUUID",meathodDescription:`inherited -> AppRecord
Reads the item using the UUID column, if it exists.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the record was found, in which case the
calling AppRecord object becomes a copy of that row in the table.`,meathodParms:[{name:"itemUUID",type:"string",description:"The UUID value that is passed in.",optional:!1}]},{meathodName:"SetFieldValue",meathodDescription:`inherited -> AppRecord
Sets the value of any column.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the column value was successfully set; false
otherwise.`,meathodParms:[{name:"name",type:"string",description:`The name of the column whose value will be set in the
AppRecord schema.`,optional:!1},{name:"value",type:["int","string","int64_t","double","TimeT","Variant"],description:`The new value for the column. The value
must be specified as it is stored in the database. For
example, for integer columns that are a foreign key to the
TS_USERS table, the value must be the database ID for
the user. TimeT values should only be used with columns
that represent dates, either as a native database date or
as a integer that represents dates in Unix Epoch time
format.`,optional:!1}]},{meathodName:"SetName",meathodDescription:`inherited -> AppRecord
Sets the "name" value of the calling object.`,meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"newName",type:"string",description:"Text to be used as the new name for the item.",optional:!1}]},{meathodName:"Unlock",meathodDescription:`inherited -> AppRecord
Unlocks the calling AppRecord, signaling that it is available
for other users.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the record was successfully unlocked or was not
locked to begin with.`,meathodParms:[{name:"currentUserOnly",type:"bool",description:`Defaults to false. If true, only the current user's
lock is unlocked. If false, any user's lock on this record is
removed.`,optional:!0}]},{meathodName:"Update",meathodDescription:`inherited -> AppRecord
This method updates the item in the database using the
values from the item.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record is updated in the database.",meathodParms:[]},{meathodName:"UpdateWithLock",meathodDescription:`inherited -> AppRecord
Updates the record that has been previously locked with
Lock() function.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record was successfully updated; false otherwise.",meathodParms:[{name:"stealLock",type:"bool",description:`Optional parameter that allows the user to skip the Lock()
function and steal the lock during the update. Defaults to
false. If true, any other user's existing lock will be broken,
causing that user's changes to be lost.`,optional:!0}]}],properties:[],inheritsDone:!0},User:{className:"User",exposed:!1,inheritsFrom:"UGBase",classDescription:"This type represents an SBM user. All methods are inherited from the UGBase object type.",meathods:[{meathodName:"Add",meathodDescription:`inherited -> AppRecord -> UGBase
This method adds a new row to a table. After creating an AppRecord from
the desired table and setting any desired field values, use this method to add the
record as a new row in its table. This is not for use with Primary tables, because
those items must go through a Submit transition. However, it is possible to make a
copy of a Primary table item using this method.`,meathodReturn:"int",meathodReturnDescription:`The TS_ID of the record added, which is unique to this table.
Zero means the record could not be added due to an error.`,meathodParms:[]},{meathodName:"Delete",meathodDescription:`inherited -> AppRecord -> UGBase
On most tables, this method removes the record from the database. On
tables such as States and Users, the records are marked as deleted but remain in
the database.`,meathodReturn:"bool",meathodReturnDescription:`True if the record is deleted from or marked as deleted in the
database.`,meathodParms:[]},{meathodName:"Fields",meathodDescription:`inherited -> AppRecord -> UGBase
Returns a VarFieldList containing all fields for a VarRecord.`,meathodReturn:"VarFieldList",meathodReturnDescription:`The list of fields from this AppRecord. If there is no FieldList for this
record, this method returns null. Use is_var_null() to check for
null.`,meathodParms:[]},{meathodName:"GetDisplayName",meathodDescription:`inherited -> AppRecord -> UGBase
Returns the display name of a record.`,meathodReturn:"string",meathodReturnDescription:"This record's display name, formatted according to table settings.",meathodParms:[]},{meathodName:"GetFieldValue",meathodDescription:`inherited -> AppRecord -> UGBase
Gets the value of any field.`,meathodReturn:"Variant",meathodReturnDescription:`The internal value for a field or column.
For Text fields, this is the exact value entered in the field;
for selection fields, the value is the database ID for the
selection. For values that are not Variant or TimeT, this
internally gets the value from the field as a Variant, and
then tries to convert the value to the requested type.
TimeT can be used with Date/Time fields to get the
internal date value.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueString",meathodDescription:`inherited -> AppRecord -> UGBase
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"string",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueInt",meathodDescription:`inherited -> AppRecord -> UGBase
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"int",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueInt64",meathodDescription:`inherited -> AppRecord -> UGBase
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"int64_t",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueDouble",meathodDescription:`inherited -> AppRecord -> UGBase
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"double",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueTimeT",meathodDescription:`inherited -> AppRecord -> UGBase
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"TimeT",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetId",meathodDescription:`inherited -> AppRecord -> UGBase
Retrieves the current AppRecord's TS_ID.`,meathodReturn:"int",meathodReturnDescription:"TS_ID of the calling AppRecord.",meathodParms:[]},{meathodName:"GetUUID",meathodDescription:`inherited -> AppRecord -> UGBase
Returns the item's UUID, if applicable.`,meathodReturn:"string",meathodReturnDescription:"The item's UUID.",meathodParms:[]},{meathodName:"GetName",meathodDescription:`inherited -> AppRecord -> UGBase
Gets the calling AppRecord's "Name" system field.`,meathodReturn:"string",meathodReturnDescription:"A text string from the associated Name field.",meathodParms:[]},{meathodName:"GetRecTableId",meathodDescription:`inherited -> AppRecord -> UGBase
Returns the calling AppRecord's table ID.`,meathodReturn:"int",meathodReturnDescription:"The calling AppRecord's table ID.",meathodParms:[]},{meathodName:"GetSchemaColumns",meathodDescription:`inherited -> AppRecord -> UGBase
Returns a Vector of SchemaColumn objects. Will not include fields for VarRecord or
ProjectBasedRecord objects.`,meathodReturn:"Vector",meathodReturnDescription:`Each entry will be a SchemaColumn object representing a column in
the database that this item can interact with.`,meathodParms:[]},{meathodName:"HasVariableDBFields",meathodDescription:`inherited -> AppRecord -> UGBase
Tests whether the calling AppRecord is from a table with variable fields.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the calling AppRecord's table has variable fields.",meathodParms:[]},{meathodName:"IsFieldEqual",meathodDescription:`inherited -> AppRecord -> UGBase
Tests for equivalence between the specified field and a value formatted as a string.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the field is found and is equal; false otherwise.",meathodParms:[{name:"fieldNameOrId",type:["int","string"],description:`If a non-numeric string, the name of the field to be tested.
Otherwise, it is converted to a number and taken as the
TS_ID of the field to be tested.`,optional:!1},{name:"value",type:"string",description:`The value to be compared to. The field's value will be
formatted as a string and compared to this value.`,optional:!1}]},{meathodName:"IsLocked",meathodDescription:`inherited -> AppRecord -> UGBase
Tests whether the calling AppRecord has been locked, meaning it is in use by another
user.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record is locked by another user.",meathodParms:[{name:"lockedByThisUser",type:"bool",description:`Without an input parameter ( or with "false" as the input ),
IsLocked() means "Does someone else have this record
locked?"
With "true" as the input parameter, the meaning is "May I
(as the current user) update this record?"`,optional:!0}]},{meathodName:"Lock",meathodDescription:`inherited -> AppRecord -> UGBase
Locks the calling AppRecord, so other users will not attempt
to update it.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record is locked by another user.",meathodParms:[{name:"stealLock",type:"bool",description:`Defaults to false, meaning if this item is already
locked, no lock will be established.
If true, any existing lock on this record will be broken, and
changes made by the former lock holder are lost.`,optional:!0}]},{meathodName:"Read",meathodDescription:`inherited -> AppRecord -> UGBase
Looks up a row in the AppRecord's table`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the TS_ID or name was found, in which case the
calling AppRecord object becomes a copy of that row in the table.`,meathodParms:[{name:"recordIdOrName",type:["int","string"],description:`If this is an int or string that SBM ModScript can convert to
an int, it is taken as the value to search for in the TS_ID
column. All other parameter types are converted to a string
and searched for in the Name system field.`,optional:!1}]},{meathodName:"ReadWithWhere",meathodDescription:`inherited -> AppRecord -> UGBase
Used to find a record by passing in a string containing a SQL
"where" clause, not including the keyword "where".`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the method found the record, in which case the calling
object becomes a copy of the record found. If more than one record
is found, the first one is copied to the calling object.`,meathodParms:[{name:"whereClause",type:"string",description:`The SQL "where" clause to find the specific record in the
table, not including the keyword "where".`,optional:!1},{name:"queryParams",type:"Vector",description:`queryParams is an optional Vector storing SQL bind
parameters, where each entry is a Pair, where the first value
is the parameter type and the second value is the value to
bind to the SQL parameter. See Pair, Map_Pair, and
Dictionary_Pair [page 123].
For the type parameter, use DBTypeConstants [page 347].`,optional:!0}]},{meathodName:"ReadByColumn",meathodDescription:`inherited -> AppRecord -> UGBase
Reads any record type by a column value`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the item is read successfully; false if the item is not
found.`,meathodParms:[{name:"columnName",type:"string",description:"The database name of the column without the TS_ prefix.",optional:!1},{name:"value",type:"Variant",description:`Behavior depends on the Variant internal type:
\u2022 string \u2013 ReadByColumn() will succeed if the column is a
text column.
\u2022 int, int64_t, short, byte, or bool \u2013 ReadByColumn() will
succeed if the column is an integer column.
\u2022 float or double \u2013 ReadByColumn() will succeed if the
column is a floating point column.`,optional:!1}]},{meathodName:"ReadByColumnAndColumn",meathodDescription:`inherited -> AppRecord -> UGBase
Reads any record type by two column values`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the item is read successfully; false if the item is not
found.`,meathodParms:[{name:"columnName",type:"string",description:'The name of the column without the "TS_" prefix',optional:!1},{name:"value",type:"Variant",description:`Value must be an int, int64_t, short, byte, bool, or string
that can be converted to an int.`,optional:!1},{name:"column2Name",type:"string",description:'The name of the second column without the "TS_" prefix.',optional:!1},{name:"value2",type:"Variant",description:`Behavior depends on the Variant internal type:
\u2022 string \u2013 ReadByColumn() will succeed if the column is a
text column.
\u2022 int, int64_t, short, byte, or bool \u2013 ReadByColumn() will
succeed if the column is an integer column.
\u2022 float or double \u2013 Not supported.`,optional:!1}]},{meathodName:"ReadByUUID",meathodDescription:`inherited -> AppRecord -> UGBase
Reads the item using the UUID column, if it exists.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the record was found, in which case the
calling AppRecord object becomes a copy of that row in the table.`,meathodParms:[{name:"itemUUID",type:"string",description:"The UUID value that is passed in.",optional:!1}]},{meathodName:"SetFieldValue",meathodDescription:`inherited -> AppRecord -> UGBase
Sets the value of any column.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the column value was successfully set; false
otherwise.`,meathodParms:[{name:"name",type:"string",description:`The name of the column whose value will be set in the
AppRecord schema.`,optional:!1},{name:"value",type:["int","string","int64_t","double","TimeT","Variant"],description:`The new value for the column. The value
must be specified as it is stored in the database. For
example, for integer columns that are a foreign key to the
TS_USERS table, the value must be the database ID for
the user. TimeT values should only be used with columns
that represent dates, either as a native database date or
as a integer that represents dates in Unix Epoch time
format.`,optional:!1}]},{meathodName:"SetName",meathodDescription:`inherited -> AppRecord -> UGBase
Sets the "name" value of the calling object.`,meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"newName",type:"string",description:"Text to be used as the new name for the item.",optional:!1}]},{meathodName:"Unlock",meathodDescription:`inherited -> AppRecord -> UGBase
Unlocks the calling AppRecord, signaling that it is available
for other users.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the record was successfully unlocked or was not
locked to begin with.`,meathodParms:[{name:"currentUserOnly",type:"bool",description:`Defaults to false. If true, only the current user's
lock is unlocked. If false, any user's lock on this record is
removed.`,optional:!0}]},{meathodName:"Update",meathodDescription:`inherited -> AppRecord -> UGBase
This method updates the item in the database using the
values from the item.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record is updated in the database.",meathodParms:[]},{meathodName:"UpdateWithLock",meathodDescription:`inherited -> AppRecord -> UGBase
Updates the record that has been previously locked with
Lock() function.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record was successfully updated; false otherwise.",meathodParms:[{name:"stealLock",type:"bool",description:`Optional parameter that allows the user to skip the Lock()
function and steal the lock during the update. Defaults to
false. If true, any other user's existing lock will be broken,
causing that user's changes to be lost.`,optional:!0}]}],properties:[],inheritsDone:!0},VarFieldList:{className:"VarFieldList",exposed:!1,inheritsFrom:"AppRecordList",classDescription:`Primary and Auxiliary tables allow the user to add columns, and these user-defined
columns are known as "variable fields." A VarFieldList is a list of Field objects representing
the variable fields of a primary or auxiliary item. Note that Field is a subtype of
AppRecord. It is possible to create your own VarFieldList object, in which case it will
contain any Field objects you choose to add to it, not necessarily corresponding to the
variable fields for any existing table.`,meathods:[{meathodName:"ApplyProjectStateOverrides",meathodDescription:`Applies the field ordering and privilege sections from the item's current state to the item's
field list.`,meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[]},{meathodName:"FindField",meathodDescription:"Finds the first field on the list that matches the given name or TS_ID.",meathodReturn:"Field",meathodReturnDescription:`The first Field on the list to match the given name or ID. If no Field
objects matched, it returns null. Check for null using is_var_null().`,meathodParms:[{name:"fldNameOrId",type:"Variant",description:`If a non-numeric string, the name of the field to be looked
up. If all uppercase, it is taken as the field's database
name. Otherwise, it is taken as the display name. The
search is not case sensitive; case is only used to determine
whether to search by database name or display name. Note
that the database name cannot be changed, but the logical
name can be changed.
If not a non-numeric string, it is converted to an int and
taken as the desired field's TS_ID.`,optional:!1}]},{meathodName:"FindSysField",meathodDescription:"Finds a field by syscode.",meathodReturn:"Field",meathodReturnDescription:`The Field on the list matching the given syscode. If no Field objects
matched, it returns null. Check for null using is_var_null().`,meathodParms:[{name:"syscode",type:"int",description:"The system code of the field to be found.",optional:!1}]},{meathodName:"SelectAll",meathodDescription:`Can force all fields to be examined for changes (or ignored) on the next Update(),
overriding the effect of the Field method Select().`,meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"index",type:"int",description:`Optional. Defaults to true if not supplied. The value to which
all Fields' select flags will be set.`,optional:!0}]},{meathodName:"Count",meathodDescription:`inherited -> AppRecordList
Returns the number of items in the list.`,meathodReturn:"int",meathodReturnDescription:"The number of items in the list.",meathodParms:[]},{meathodName:"DeleteRecord",meathodDescription:`inherited -> AppRecordList
Removes the specified record from the list.`,meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"recordId",type:"int",description:"The TS_ID of the record to delete from the list.",optional:!1}]},{meathodName:"FindRecord",meathodDescription:`inherited -> AppRecordList
Find a specific record in the current list by matching its name or TS_ID.`,meathodReturn:"AppRecord",meathodReturnDescription:`The first AppRecord in the list that matches the given name or ID. If
there is no match, returns null. Use is_var_null() to check for null.`,meathodParms:[{name:"recordIdOrName",type:"Variant",description:`If this parameter is a non-numeric string, it is taken as
the desired record's name. Otherwise, it is converted to
an integer and taken as the desired record's TS_ID.`,optional:!1}]},{meathodName:"Length",meathodDescription:`inherited -> AppRecordList
Returns the number of items in the list.`,meathodReturn:"int",meathodReturnDescription:"The number of items in the list.",meathodParms:[]},{meathodName:"Read",meathodDescription:`inherited -> AppRecordList
Fills the AppRecordList from its table.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if successful; false otherwise. A successful read may
return zero results if no items match the query. Check for results by
calling the AppRecordList.empty() method.`,meathodParms:[]},{meathodName:"ReadByColumn",meathodDescription:`inherited -> AppRecordList
Reads any record list type by a column value`,meathodReturn:"bool",meathodReturnDescription:`Returns true if successful; false otherwise. A successful read may
return zero results if no items match the query. Check for results by
calling the AppRecordList.empty() method.`,meathodParms:[{name:"columnName",type:"string",description:'The name of the column without the "TS_" prefix.',optional:!1},{name:"value",type:"Variant",description:`Behavior depends on the Variant internal type:
\u2022 string \u2013 ReadByColumn() will succeed if the column is a
text column.
\u2022 int, int64_t, short, byte, or bool \u2013 ReadByColumn() will
succeed if the column is an integer column.
\u2022 float or double \u2013 ReadByColumn() will succeed if the
column is a floating point column.`,optional:!1}]},{meathodName:"ReadByColumnAndColumn",meathodDescription:`inherited -> AppRecordList
Reads any record list type by two column values.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if successful; false otherwise. A successful read may
return zero results if no items match the query. Check for results by
calling the AppRecordList.empty() method.`,meathodParms:[{name:"columnName",type:"string",description:'The name of the column without the "TS_" prefix',optional:!1},{name:"value",type:"Variant",description:`Value must be an int, int64_t, short, byte, bool, or string
that can be converted to an int.`,optional:!1},{name:"column2Name",type:"string",description:'The name of the second column without the "TS_" prefix.',optional:!1},{name:"value2",type:"Variant",description:`Behavior depends on the Variant internal type:
\u2022 string \u2013 ReadByColumn() will succeed if the column is a
text column.
\u2022 int, int64_t, short, byte, or bool \u2013 ReadByColumn() will
succeed if the column is an integer column.
\u2022 float or double \u2013 Not supported.`,optional:!1}]},{meathodName:"ReadWithWhere",meathodDescription:`inherited -> AppRecordList
An alternative to Read(), this method uses SQL to select
only certain records from the calling AppRecordList's table, rather than reading the entire
table.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if successful; false otherwise. A successful read may
return zero results if no items match the query. Check for results by
calling the AppRecordList.empty() method.`,meathodParms:[{name:"whereClause",type:"string",description:`A SQL "where clause" specifying the records to find. SBM
will build a SQL string requesting all fields for the calling
AppRecordList's table. The string contents of
whereClause will appear after the word "where" in this
SQL statement.`,optional:!1},{name:"params",type:"Vector",description:`Params is an optional Vector storing SQL bind
parameters, where each entry is a Pair, with the first
value as the parameter type and the second value as the
value to bind to the SQL parameter. See Pair, Map_Pair,
and Dictionary_Pair [page 123].
For the type parameter, use DBTypeConstants [page
347].`,optional:!0},{name:"orderBy",type:"string",description:`Identifies a column used for ordering the AppRecordList.
To use the templateRec parameter without the orderBy
parameter, use an empty string as a parameter for the
orderBy parameter.`,optional:!0},{name:"templateRec",type:"AppRecord",description:`Optional. Identifies which fields are read into all
AppRecords in the AppRecordList. Using this parameter
may improve performance when using AppRecordOjbects
which contain a VarFieldList from Primary or Auxiliary
tables.
To use this optional parameter, create a VarRecord
against the Primary table you are doing your
ReadWithWhere against. Get the VarFieldList of that
VarRecord through the Fields() method. Call SelectAll,
and pass it false to clear all fields. Then, explicitly turn
on the fields you wish to read by finding the Field on the
VarFieldList, and then calling that Field's Select() method
and passing it true.`,optional:!0}]},{meathodName:"clear",meathodDescription:`inherited -> AppRecordList
Removes all records from the list.`,meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[]},{meathodName:"empty",meathodDescription:`inherited -> AppRecordList
Returns true if the list is empty.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the list is empty; false if there are items in the list.",meathodParms:[]},{meathodName:"erase_at",meathodDescription:`inherited -> AppRecordList
Removes the item at specified index from the list.`,meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"index",type:"int",description:"The zero-based index of the item to remove from the list.",optional:!1}]},{meathodName:"size",meathodDescription:`inherited -> AppRecordList
Returns the number of items in the list`,meathodReturn:"size_t",meathodReturnDescription:"The number of items in the list.",meathodParms:[]},{meathodName:"Update",meathodDescription:`inherited -> AppRecordList
Perform a database update on all records in the list.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if all applicable records are successfully updated; false
otherwise.`,meathodParms:[]}],properties:[],inheritsDone:!0},Variant:{className:"Variant",exposed:!1,inheritsFrom:"",classDescription:`A class that wraps multiple data types, especially for scripts that are converted from SBM
AppScript to SBM ModScript.
Variant is supported in SBM ModScript in order to ease conversion from SBM AppScript.
Variant is modeled after VBScript's "Variant".`,meathods:[],properties:[]},VarRecord:{className:"VarRecord",exposed:!1,inheritsFrom:"AppRecord",classDescription:`A VarRecord is any record that has variable fields. In other words, it represents any
primary or auxiliary item. The item's fields are not defined by the database schema. They
are added by designers using SBM Composer. VarRecord objects require a table ID at
creation, using Ext.CreateVarRecord().`,meathods:[{meathodName:"GetDisplayIssueId",meathodDescription:`Returns the item's display ID, consisting of a prefix indicating the item's type and a serial
number within the item's project.`,meathodReturn:"string",meathodReturnDescription:"The item's display ID.",meathodParms:[]},{meathodName:"GetFieldValue",meathodDescription:"Gets the value of a field in the calling record's variable field list.",meathodReturn:"Variant",meathodReturnDescription:`The internal value for the field. For Text fields,
this is the exact value entered in the field. For values that
are not Variant or TimeT, this internally gets the value
from the field as a Variant, and then tries to convert the
value to the requested type.
TimeT can be used with Date/Time fields to get the
internal date value.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the calling record's variable field list.
Field names for variable fields should be provided in upper
case for database names (TITLE, for example) or in lower/
mixed-case for display names (Title, for example). For
details on working with different types of database fields,
refer to Working with SBM Database Fields [page 39].`,optional:!1}]},{meathodName:"GetItemNumber",meathodDescription:"Returns the numeric portion of the item's display ID.",meathodReturn:"int",meathodReturnDescription:"The item's display ID.",meathodParms:[]},{meathodName:"GetItemPrefix",meathodDescription:`Returns the prefix of the item's display ID, indicating the item's type. Item types and their
prefixes are defined when an SBM designer configures a workflow.`,meathodReturn:"string",meathodReturnDescription:"The prefix of the item's display ID.",meathodParms:[]},{meathodName:"GetStateId",meathodDescription:"Identifies the calling record's state within a workflow.",meathodReturn:"int",meathodReturnDescription:`TS_ID of the record's state within the item's workflow. If the record
is not from a primary table, then it does not have a workflow and the
return value is -1.`,meathodParms:[]},{meathodName:"SetFieldValue",meathodDescription:"Sets the value of any column.",meathodReturn:"bool",meathodReturnDescription:"True if the field was changed.",meathodParms:[{name:"name",type:"string",description:`The name of the column whose value will be set in the
AppRecord schema.`,optional:!1},{name:"recordIdOrName",type:["int","string","int64_t","double","TimeT","Variant"],description:`The new value for the column. The value
must be specified as it is stored in the database. For
example, for integer columns that are a foreign key to the
TS_USERS table, the value must be the database ID for
the user. TimeT values should only be used with columns
that represent dates, either as a native database date or
as a integer that represents dates in Unix Epoch time
format.`,optional:!1},{name:"fieldList",type:"Variant",description:`Optional. If supplied and equal to the global
constant Nothing, this parameter will refer to the calling
record's VarFieldList when this method returns. If supplied
and not equal to Nothing, this parameter is taken to be the
calling record's VarFieldList.
Do not set this parameter's value yourself. Always pass a
variable set to Nothing and then reuse the variable for
subsequent calls to GetFieldValue() and SetFieldValue() on
the same VarRecord object. If this parameter is omitted,
no functionality changes, but efficiency may suffer.`,optional:!0},{name:"field",type:"Variant",description:`Optional. If supplied and equal to the global
constant Nothing, this parameter will refer to the Field
object on the calling record's VarFieldList whose name
matches the name input parameter when this method
returns. If supplied and not equal to Nothing, this
parameter is taken to be that Field object.`,optional:!0}]},{meathodName:"StartTransition",meathodDescription:"Starts a transition on an item.",meathodReturn:"bool",meathodReturnDescription:`Returns true if transition was started. If false, use
Shell.GetLastErrorMessage() for more information.`,meathodParms:[{name:"trans",type:"Variant",description:`Can be transition ID, 0 (will use default Update transition
for item), transition UUID, or transition internal name.`,optional:!1},{name:"stealLock",type:"bool",description:`If true, any item lock on this item will be stolen by
this transition. If it was locked, the user who had the item
locked (in transition) will not be able to complete their
transition. Does not guarantee that the transition succeeds,
as scripts can steal locks from each other.`,optional:!0}]},{meathodName:"StartTransitionWithLock",meathodDescription:` Identical to StartTransition(), assumes AppRecord.Lock()
has been invoked.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if transition was started. If false, use
Shell.GetLastErrorMessage() for more information.`,meathodParms:[{name:"trans",type:"Variant",description:`Can be transition ID, 0 (will use default Update transition
for item), transition UUID, or transition internal name.`,optional:!1},{name:"stealLock",type:"bool",description:`If true, any item lock on this item will be stolen by
this transition. If it was locked, the user who had the item
locked (in transition) will not be able to complete their
transition. Does not guarantee that the transition succeeds,
as scripts can steal locks from each other.`,optional:!0}]},{meathodName:"FinishTransition",meathodDescription:`Finishes a transition on an item after StartTransition() has
been invoked and field values have been set.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if transition completed successfully. If false, use
Shell.GetLastErrorMessage() for more information.`,meathodParms:[{name:"trans",type:"Variant",description:`Can be transition ID, 0 (will use default Update transition
for item), transition UUID, or transition internal name.`,optional:!1},{name:"stealLock",type:"bool",description:`If true, any item lock on this item will be stolen by
this transition. If it was locked, the user who had the item
locked (in transition) will not be able to complete their
transition. Does not guarantee that the transition succeeds,
as scripts can steal locks from each other.`,optional:!0},{name:"signedUserID",type:"string",description:`Optional. Provides the user name portion of the signature if
the transition requires a user's signature.`,optional:!0},{name:"signedUserPwd",type:"string",description:`Optional, required if signedUserID is provided. Provides the
password portion of the signature if the transition requires a
user's signature.`,optional:!0}]},{meathodName:"QuickTransition",meathodDescription:`Identical to FinishTransition() except that StartTransition() is
not required.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if transition completed successfully. If false, use
Shell.GetLastErrorMessage() for more information.`,meathodParms:[{name:"trans",type:"Variant",description:`Can be transition ID, 0 (will use default Update transition
for item), transition UUID, or transition internal name.`,optional:!1},{name:"stealLock",type:"bool",description:`If true, any item lock on this item will be stolen by
this transition. If it was locked, the user who had the item
locked (in transition) will not be able to complete their
transition. Does not guarantee that the transition succeeds,
as scripts can steal locks from each other.`,optional:!0},{name:"signedUserID",type:"string",description:`Optional. Provides the user name portion of the signature if
the transition requires a user's signature.`,optional:!0},{name:"signedUserPwd",type:"string",description:`Optional, required if signedUserID is provided. Provides the
password portion of the signature if the transition requires a
user's signature.`,optional:!0}]},{meathodName:"StartSubmitToAux",meathodDescription:"Starts the submit of a new item into an auxiliary table.",meathodReturn:"bool",meathodReturnDescription:`Returns true if transition completed successfully. If false, use
Shell.GetLastErrorMessage() for more information.`,meathodParms:[]},{meathodName:"FinishSubmitToAux",meathodDescription:"Finishes the submit into an auxiliary table.",meathodReturn:"bool",meathodReturnDescription:`Returns true if transition completed successfully. If false, use
Shell.GetLastErrorMessage() for more information.`,meathodParms:[]},{meathodName:"QuickSubmitToAux",meathodDescription:`Identical to FinishSubmitToAux except StartSubmitToAux is
not required.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if transition completed successfully. If false, use
Shell.GetLastErrorMessage() for more information.`,meathodParms:[]},{meathodName:"Add",meathodDescription:`inherited -> AppRecord
This method adds a new row to a table. After creating an AppRecord from
the desired table and setting any desired field values, use this method to add the
record as a new row in its table. This is not for use with Primary tables, because
those items must go through a Submit transition. However, it is possible to make a
copy of a Primary table item using this method.`,meathodReturn:"int",meathodReturnDescription:`The TS_ID of the record added, which is unique to this table.
Zero means the record could not be added due to an error.`,meathodParms:[]},{meathodName:"Delete",meathodDescription:`inherited -> AppRecord
On most tables, this method removes the record from the database. On
tables such as States and Users, the records are marked as deleted but remain in
the database.`,meathodReturn:"bool",meathodReturnDescription:`True if the record is deleted from or marked as deleted in the
database.`,meathodParms:[]},{meathodName:"Fields",meathodDescription:`inherited -> AppRecord
Returns a VarFieldList containing all fields for a VarRecord.`,meathodReturn:"VarFieldList",meathodReturnDescription:`The list of fields from this AppRecord. If there is no FieldList for this
record, this method returns null. Use is_var_null() to check for
null.`,meathodParms:[]},{meathodName:"GetDisplayName",meathodDescription:`inherited -> AppRecord
Returns the display name of a record.`,meathodReturn:"string",meathodReturnDescription:"This record's display name, formatted according to table settings.",meathodParms:[]},{meathodName:"GetFieldValueString",meathodDescription:`inherited -> AppRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"string",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueInt",meathodDescription:`inherited -> AppRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"int",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueInt64",meathodDescription:`inherited -> AppRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"int64_t",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueDouble",meathodDescription:`inherited -> AppRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"double",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetFieldValueTimeT",meathodDescription:`inherited -> AppRecord
Gets the value of a field in the calling record's variable field list.`,meathodReturn:"TimeT",meathodReturnDescription:`The internal value for the field. For Text fields, this is the exact value
entered in the field.`,meathodParms:[{name:"name",type:"string",description:`The name of the field whose value will be retrieved from
the variable field list or the AppRecord column. Field
names for variable fields should be provided in uppercase
characters for database names or in lowercase/mixed-case
characters for display names (for Title, for example).`,optional:!1}]},{meathodName:"GetId",meathodDescription:`inherited -> AppRecord
Retrieves the current AppRecord's TS_ID.`,meathodReturn:"int",meathodReturnDescription:"TS_ID of the calling AppRecord.",meathodParms:[]},{meathodName:"GetUUID",meathodDescription:`inherited -> AppRecord
Returns the item's UUID, if applicable.`,meathodReturn:"string",meathodReturnDescription:"The item's UUID.",meathodParms:[]},{meathodName:"GetName",meathodDescription:`inherited -> AppRecord
Gets the calling AppRecord's "Name" system field.`,meathodReturn:"string",meathodReturnDescription:"A text string from the associated Name field.",meathodParms:[]},{meathodName:"GetRecTableId",meathodDescription:`inherited -> AppRecord
Returns the calling AppRecord's table ID.`,meathodReturn:"int",meathodReturnDescription:"The calling AppRecord's table ID.",meathodParms:[]},{meathodName:"GetSchemaColumns",meathodDescription:`inherited -> AppRecord
Returns a Vector of SchemaColumn objects. Will not include fields for VarRecord or
ProjectBasedRecord objects.`,meathodReturn:"Vector",meathodReturnDescription:`Each entry will be a SchemaColumn object representing a column in
the database that this item can interact with.`,meathodParms:[]},{meathodName:"HasVariableDBFields",meathodDescription:`inherited -> AppRecord
Tests whether the calling AppRecord is from a table with variable fields.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the calling AppRecord's table has variable fields.",meathodParms:[]},{meathodName:"IsFieldEqual",meathodDescription:`inherited -> AppRecord
Tests for equivalence between the specified field and a value formatted as a string.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the field is found and is equal; false otherwise.",meathodParms:[{name:"fieldNameOrId",type:["int","string"],description:`If a non-numeric string, the name of the field to be tested.
Otherwise, it is converted to a number and taken as the
TS_ID of the field to be tested.`,optional:!1},{name:"value",type:"string",description:`The value to be compared to. The field's value will be
formatted as a string and compared to this value.`,optional:!1}]},{meathodName:"IsLocked",meathodDescription:`inherited -> AppRecord
Tests whether the calling AppRecord has been locked, meaning it is in use by another
user.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record is locked by another user.",meathodParms:[{name:"lockedByThisUser",type:"bool",description:`Without an input parameter ( or with "false" as the input ),
IsLocked() means "Does someone else have this record
locked?"
With "true" as the input parameter, the meaning is "May I
(as the current user) update this record?"`,optional:!0}]},{meathodName:"Lock",meathodDescription:`inherited -> AppRecord
Locks the calling AppRecord, so other users will not attempt
to update it.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record is locked by another user.",meathodParms:[{name:"stealLock",type:"bool",description:`Defaults to false, meaning if this item is already
locked, no lock will be established.
If true, any existing lock on this record will be broken, and
changes made by the former lock holder are lost.`,optional:!0}]},{meathodName:"Read",meathodDescription:`inherited -> AppRecord
Looks up a row in the AppRecord's table`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the TS_ID or name was found, in which case the
calling AppRecord object becomes a copy of that row in the table.`,meathodParms:[{name:"recordIdOrName",type:["int","string"],description:`If this is an int or string that SBM ModScript can convert to
an int, it is taken as the value to search for in the TS_ID
column. All other parameter types are converted to a string
and searched for in the Name system field.`,optional:!1}]},{meathodName:"ReadWithWhere",meathodDescription:`inherited -> AppRecord
Used to find a record by passing in a string containing a SQL
"where" clause, not including the keyword "where".`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the method found the record, in which case the calling
object becomes a copy of the record found. If more than one record
is found, the first one is copied to the calling object.`,meathodParms:[{name:"whereClause",type:"string",description:`The SQL "where" clause to find the specific record in the
table, not including the keyword "where".`,optional:!1},{name:"queryParams",type:"Vector",description:`queryParams is an optional Vector storing SQL bind
parameters, where each entry is a Pair, where the first value
is the parameter type and the second value is the value to
bind to the SQL parameter. See Pair, Map_Pair, and
Dictionary_Pair [page 123].
For the type parameter, use DBTypeConstants [page 347].`,optional:!0}]},{meathodName:"ReadByColumn",meathodDescription:`inherited -> AppRecord
Reads any record type by a column value`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the item is read successfully; false if the item is not
found.`,meathodParms:[{name:"columnName",type:"string",description:"The database name of the column without the TS_ prefix.",optional:!1},{name:"value",type:"Variant",description:`Behavior depends on the Variant internal type:
\u2022 string \u2013 ReadByColumn() will succeed if the column is a
text column.
\u2022 int, int64_t, short, byte, or bool \u2013 ReadByColumn() will
succeed if the column is an integer column.
\u2022 float or double \u2013 ReadByColumn() will succeed if the
column is a floating point column.`,optional:!1}]},{meathodName:"ReadByColumnAndColumn",meathodDescription:`inherited -> AppRecord
Reads any record type by two column values`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the item is read successfully; false if the item is not
found.`,meathodParms:[{name:"columnName",type:"string",description:'The name of the column without the "TS_" prefix',optional:!1},{name:"value",type:"Variant",description:`Value must be an int, int64_t, short, byte, bool, or string
that can be converted to an int.`,optional:!1},{name:"column2Name",type:"string",description:'The name of the second column without the "TS_" prefix.',optional:!1},{name:"value2",type:"Variant",description:`Behavior depends on the Variant internal type:
\u2022 string \u2013 ReadByColumn() will succeed if the column is a
text column.
\u2022 int, int64_t, short, byte, or bool \u2013 ReadByColumn() will
succeed if the column is an integer column.
\u2022 float or double \u2013 Not supported.`,optional:!1}]},{meathodName:"ReadByUUID",meathodDescription:`inherited -> AppRecord
Reads the item using the UUID column, if it exists.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the record was found, in which case the
calling AppRecord object becomes a copy of that row in the table.`,meathodParms:[{name:"itemUUID",type:"string",description:"The UUID value that is passed in.",optional:!1}]},{meathodName:"SetName",meathodDescription:`inherited -> AppRecord
Sets the "name" value of the calling object.`,meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"newName",type:"string",description:"Text to be used as the new name for the item.",optional:!1}]},{meathodName:"Unlock",meathodDescription:`inherited -> AppRecord
Unlocks the calling AppRecord, signaling that it is available
for other users.`,meathodReturn:"bool",meathodReturnDescription:`Returns true if the record was successfully unlocked or was not
locked to begin with.`,meathodParms:[{name:"currentUserOnly",type:"bool",description:`Defaults to false. If true, only the current user's
lock is unlocked. If false, any user's lock on this record is
removed.`,optional:!0}]},{meathodName:"Update",meathodDescription:`inherited -> AppRecord
This method updates the item in the database using the
values from the item.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record is updated in the database.",meathodParms:[]},{meathodName:"UpdateWithLock",meathodDescription:`inherited -> AppRecord
Updates the record that has been previously locked with
Lock() function.`,meathodReturn:"bool",meathodReturnDescription:"Returns true if the record was successfully updated; false otherwise.",meathodParms:[{name:"stealLock",type:"bool",description:`Optional parameter that allows the user to skip the Lock()
function and steal the lock during the update. Defaults to
false. If true, any other user's existing lock will be broken,
causing that user's changes to be lost.`,optional:!0}]}],properties:[],inheritsDone:!0},char32_t:{className:"char32_t",exposed:!1,inheritsFrom:"",classDescription:"A set of utility functions for identifying Unicode traits of char32_t code points.",meathods:[],properties:[]},Dictionary_Pair:{className:"Dictionary_Pair",exposed:!1,inheritsFrom:"",classDescription:`Dictionary is a class for supporting dictionary objects in scripts that are converted from
SBM AppScript to SBM ModScript, in general, use ChaiScript's Map instead. Entries in
Dictionary will be of type Dictionary_Pair. In Dictionary_Pair, first is a string; second is a
Variant.`,meathods:[{meathodName:"first",meathodDescription:"Accesses the first object in the Dictionary_Pair.",meathodReturn:"string",meathodReturnDescription:"The first object in the Dictionary_Pair.",meathodParms:[]},{meathodName:"second",meathodDescription:"Accesses the second object in the Dictionary_Pair.",meathodReturn:"Variant",meathodReturnDescription:"The second object in the Dictionary_Pair.",meathodParms:[]}],properties:[]},int:{className:"int",exposed:!1,inheritsFrom:"",classDescription:"int",meathods:[],properties:[]},Map:{className:"Map",exposed:!1,inheritsFrom:"",classDescription:`The Map class is a case sensitive key-value container, where the keys are strings. Keys
will all be unique.`,meathods:[{meathodName:"at",meathodDescription:`Accesses value at location key. Throws exception if not
found.`,meathodReturn:"Variant",meathodReturnDescription:"The value at location key.",meathodParms:[{name:"key",type:"string",description:"location of value",optional:!1}]},{meathodName:"clear",meathodDescription:"Empties the Map.",meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[]},{meathodName:"empty",meathodDescription:"Returns true if the Map is empty.",meathodReturn:"bool",meathodReturnDescription:"Returns true if the Map is empty.",meathodParms:[]},{meathodName:"size",meathodDescription:"Returns the count of items in the Map.",meathodReturn:"size_t",meathodReturnDescription:"Returns the count of items in the Map.",meathodParms:[]},{meathodName:"count",meathodDescription:`Returns 1 if key is found inside the container;
otherwise, 0.`,meathodReturn:"size_t",meathodReturnDescription:`Returns 1 if key is found inside the container;
otherwise, 0.`,meathodParms:[{name:"key",type:"string",description:"The key you want to check for.",optional:!1}]},{meathodName:"erase",meathodDescription:`Removes specified elements from the container, if one
exists. Returns 1 if key is found inside the container; otherwise, 0.`,meathodReturn:"size_t",meathodReturnDescription:"Returns 1 if key is found inside the container; otherwise, 0.",meathodParms:[{name:"key",type:"string",description:"The key you want to remove.",optional:!1}]},{meathodName:"insert",meathodDescription:`Copies values from m into this Map. Ignores values from m
with keys that are already in this map.
Inserts value p into this Map. Ignores p if the key value
is already in this map.`,meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"m or p",type:["Map","Map_Pair"],description:`If a map, copies values from m into this Map. If a map_pair 
Inserts value p into this Map. Ignores p if the key value
is already in this map.`,optional:!1}]}],properties:[]},Map_Pair:{className:"Map_Pair",exposed:!1,inheritsFrom:"",classDescription:`The entries in a Map will be of type Map_Pair. In Map_Pair, first is a string; second is
any object type.`,meathods:[{meathodName:"first",meathodDescription:"Accesses the first object in the Map_Pair.",meathodReturn:"string",meathodReturnDescription:"The first object in the Map_Pair.",meathodParms:[]},{meathodName:"second",meathodDescription:"Accesses the second object in the Map_Pair.",meathodReturn:"Variant",meathodReturnDescription:"The second object in the Map_Pair.",meathodParms:[]}],properties:[]},Pair:{className:"Pair",exposed:!1,inheritsFrom:"",classDescription:"The Pair class stores two objects.",meathods:[{meathodName:"first",meathodDescription:"Accesses the first object in the Pair.",meathodReturn:"variant",meathodReturnDescription:"The first object in the Pair.",meathodParms:[]},{meathodName:"second",meathodDescription:"Accesses the second object in the Pair.",meathodReturn:"Variant",meathodReturnDescription:"The second object in the Pair.",meathodParms:[]}],properties:[]},string:{className:"string",exposed:!1,inheritsFrom:"",classDescription:"The string class stores a text value in UTF-8.",meathods:[],properties:[]},u32string:{className:"u32string",exposed:!1,inheritsFrom:"",classDescription:`The utility string class that stores a text value in UTF-32. This is not the default string
class, but can be used for working with Unicode string contents. See
string.to_u32string() in string [page 125].`,meathods:[],properties:[]},Unknown:{className:"Unknown",exposed:!1,inheritsFrom:"",classDescription:`This is a variable of unknown type.
The parser determined this was a variable but not its type.
You can hint to the parse engine what type it is by commenting:
//var VARNAME is TYPE
inside of the scope the variable is in.`,meathods:[],properties:[]},Vector:{className:"Vector",exposed:!1,inheritsFrom:"",classDescription:"The Vector class stores a resizable array of objects.",meathods:[{meathodName:"clear",meathodDescription:"Empties the Vector.",meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[]},{meathodName:"empty",meathodDescription:"Returns true if the Vector is empty.",meathodReturn:"bool",meathodReturnDescription:"Returns true if the Vector is empty.",meathodParms:[]},{meathodName:"size",meathodDescription:"Returns the count of items in the Vector",meathodReturn:"size_t",meathodReturnDescription:"Returns the count of items in the Vector",meathodParms:[]},{meathodName:"front",meathodDescription:`Accesses value at the beginning of the Vector. Throws an
exception if the Vector is empty.`,meathodReturn:"Variant",meathodReturnDescription:"Returns the value at the beginning of the Vector.",meathodParms:[]},{meathodName:"back",meathodDescription:`Accesses value at the end of the Vector. Throws an
exception if the Vector is empty.`,meathodReturn:"Variant",meathodReturnDescription:"Returns the value at the end of the Vector.",meathodParms:[]},{meathodName:"push_back",meathodDescription:"Inserts the value o at the end of the Vector",meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"o",type:"Variant",description:"Inserts the value o at the end of the Vector",optional:!1}]},{meathodName:"pop_back",meathodDescription:`Removes value from the end of the Vector. Do not invoke this on
an empty Vector.`,meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[]},{meathodName:"insert_at",meathodDescription:`Inserts o at position index. Throws an
exception if index is out of range.`,meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"index",type:"int",description:"The zero based index of where to place the value o.",optional:!1},{name:"o",type:"Variant",description:"The value o will be inserted into the Vector.",optional:!1}]},{meathodName:"erase_at",meathodDescription:`Removes object at position index. Throws an exception
if index is out of range.`,meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"index",type:"int",description:"The zero based index of where to remove the value.",optional:!1}]},{meathodName:"resize",meathodDescription:`Resizes the Vector to
contain count elements. If the current size is greater than the count, the container
is reduced to its first count elements. If the current size is less than count,
additional elements are appended and copied from o.`,meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"count",type:"size_t",description:"The new size of the Vector",optional:!1},{name:"o",type:"Variant",description:`If count is greater than the current size, additional elements are appended and copied from o.
If o is not provided the new values will be default-initialized.`,optional:!0}]},{meathodName:"reserve",meathodDescription:"Pre-allocates a buffer of size count for future use.",meathodReturn:"void",meathodReturnDescription:"void",meathodParms:[{name:"count",type:"size_t",description:"New buffer of size of Vector for future use.",optional:!1}]},{meathodName:"capacity",meathodDescription:"Returns the current buffer size.",meathodReturn:"size_t",meathodReturnDescription:"Returns the current buffer size.",meathodParms:[]}],properties:[]},void:{className:"void",exposed:!1,inheritsFrom:"",classDescription:"void",meathods:[],properties:[]},DBTypeConstants:{className:"DBTypeConstants",exposed:!0,inheritsFrom:"",classDescription:`Global const object for database types, used in SchemaColumn, SQLColumnDef, and SQL
parameters.`,properties:[{propertyName:"BIGINT",propertyDescription:"-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807",propertyType:"int",readOnly:!0},{propertyName:"INTEGER",propertyDescription:"-2,147,483,648 to 2,147,483,647",propertyType:"int",readOnly:!0},{propertyName:"SMALLINT",propertyDescription:"-32,768 to 32,767",propertyType:"int",readOnly:!0},{propertyName:"TINYINT",propertyDescription:"0 to 255",propertyType:"int",readOnly:!0},{propertyName:"DOUBLE",propertyDescription:"8 byte floating point number with a range of 2.2 \xD7 10^-308 to 1.8 \xD7 10^308",propertyType:"int",readOnly:!0},{propertyName:"FLOAT",propertyDescription:"4 byte floating point number with a range of 1.7 \xD7 10^-38 to 3.4 \xD7 10^38",propertyType:"int",readOnly:!0},{propertyName:"DATETIME",propertyDescription:"A date and time combination. Format: YYYY-MM-DD hh:mm:ss. The supported range is from '1000-01-01 00:00:00' to '9999-12-31 23:59:59'.",propertyType:"int",readOnly:!0},{propertyName:"DECIMAL",propertyDescription:"Fixed precision and scale numbers. Allows numbers from -10^38 +1 to 10^38 \u20131.",propertyType:"int",readOnly:!0},{propertyName:"NUMERIC",propertyDescription:"Fixed precision and scale numbers. Allows numbers from -10^38 +1 to 10^38 \u20131.",propertyType:"int",readOnly:!0},{propertyName:"CHAR",propertyDescription:"Fixed width character string. 8,000 characters Max size",propertyType:"int",readOnly:!0},{propertyName:"VARCHAR",propertyDescription:"Variable width character string. 8,000 characters Max size",propertyType:"int",readOnly:!0},{propertyName:"LONGVARCHAR",propertyDescription:"Variable width character string. 1,073,741,824 characters Max size",propertyType:"int",readOnly:!0}],meathods:[]}};var Ye={Map:{innerType:"Map_Pair"},string:{innerType:"char"},u32string:{innerType:"char32_t"},Vector:{innerType:"Variant"},AppRecordList:{innerType:"AppRecord"},Dictionary:{innerType:" Dictionary_Pair"}};var Fa=require("fs"),re=Vt,Lt=[];for(let[t,e]of Object.entries(re))e.className==""&&Lt.push(t);var _t=[];for(let t of Lt)_t.push(re[t]);var me={},ue={},fe={},ca=["var","global","def","try","catch","finally","if","else","while","for","case","default","switch","return","break","continue","this"];function pa(t){let e=p.languages.registerCompletionItemProvider("modscript",{provideCompletionItems(c,D,E,O){var G;let P=[];for(var M of ca){let b=new p.CompletionItem(M,p.CompletionItemKind.Keyword);b.commitCharacters=["("],P.push(b)}for(let[b,R]of Object.entries(re))if(R.className=="")for(let S of R.meathods){let g=new p.CompletionItem(S.meathodName,p.CompletionItemKind.Function);g.documentation=new p.MarkdownString(S.meathodDescription),g.commitCharacters=["("],P.push(g)}else{if(!R.exposed)continue;let S=new p.CompletionItem(R.className,p.CompletionItemKind.Class);S.commitCharacters=["."],S.documentation=new p.MarkdownString(R.classDescription),P.push(S)}for(var k of ue[c.uri.toString()]){let b=new p.CompletionItem(k.meathodName,p.CompletionItemKind.Function);b.documentation=new p.MarkdownString(k.meathodDescription),b.commitCharacters=["("],P.push(b)}let A={};for(var T of me[c.uri.toString()]){let b=new p.CompletionItem(T.variable,p.CompletionItemKind.Variable);b.commitCharacters=["."],T.range.contains(D)&&(typeof T.type!="undefined"?typeof re[T.type]!="undefined"?b.documentation=new p.MarkdownString(`**${T.type}**
${(G=re[T.type])==null?void 0:G.classDescription}`):b.documentation=new p.MarkdownString(`Variable of type: **${T.type}**`):b.documentation=new p.MarkdownString("Variable with unknown type."),A[T.variable]?T.range.end.line-T.range.start.line<A[T.variable].range.end.line-A[T.variable].range.start.line&&(A[T.variable]={comp:b,range:T.range}):A[T.variable]={comp:b,range:T.range})}return P=P.concat(Object.values(A).map(b=>b.comp)),P}}),o=p.languages.registerCompletionItemProvider("modscript",{provideCompletionItems(c,D){let E=" "+c.lineAt(D).text.substr(0,D.character),O=[];for(let[b,R]of Object.entries(re))if(R.className!=""&&!!R.exposed&&E.match(new RegExp(`\\W${R.className}[.][A-Za-z0-9]*$`,"g"))){for(let S of R.meathods){let g=new p.CompletionItem(S.meathodName,p.CompletionItemKind.Method);g.documentation=new p.MarkdownString(S.meathodDescription),g.commitCharacters=["("],O.push(g)}if(R==null?void 0:R.properties)for(let S of R.properties){let g=new p.CompletionItem(S.propertyName,p.CompletionItemKind.Property);g.documentation=new p.MarkdownString(S.propertyDescription),O.push(g)}break}let P={},M=Ee(E),k="";for(let b of M)k=Ie(k+b,me[c.uri.toString()],ue[c.uri.toString()],fe[c.uri.toString()],D);var A=Object.assign({},re);for(let b of fe[c.uri.toString()])A[b.className]=b;if(E.match(new RegExp("\\Wthis[.][A-Za-z0-9]*$","g"))){for(let b of fe[c.uri.toString()])if(b.range.contains(D)){k=b.className;break}}if(k){for(let[b,R]of Object.entries(A))if(R.className!=""&&R.className==k){let S=[];for(let g of R.meathods){let _=new p.CompletionItem(g.meathodName,p.CompletionItemKind.Method);_.documentation=new p.MarkdownString(g.meathodDescription),_.commitCharacters=["("],O.push(_)}if(R==null?void 0:R.properties)for(let g of R.properties){let _=new p.CompletionItem(g.propertyName,p.CompletionItemKind.Property);_.documentation=new p.MarkdownString(g.propertyDescription),O.push(_)}}}else for(var T of me[c.uri.toString()])if(typeof T.type!="undefined"&&E.match(new RegExp(`\\W${T.variable}[.][A-Za-z0-9]*$`,"g"))){for(let[b,R]of Object.entries(A))if(R.className!=""&&R.className==T.type&&T.range.contains(D)){let S=[];for(let g of R.meathods){let _=new p.CompletionItem(g.meathodName,p.CompletionItemKind.Method);_.documentation=new p.MarkdownString(g.meathodDescription),_.commitCharacters=["("],S.push(_)}if(R==null?void 0:R.properties)for(let g of R.properties){let _=new p.CompletionItem(g.propertyName,p.CompletionItemKind.Property);_.documentation=new p.MarkdownString(g.propertyDescription),S.push(_)}P[T.variable]?T.range.end.line-T.range.start.line<P[T.variable].range.end.line-P[T.variable].range.start.line&&(P[T.variable]={comp:S,range:T.range}):P[T.variable]={comp:S,range:T.range}}}O=O.concat(Object.values(P).map(b=>b.comp).flat());var G=O.reduce((b,R)=>(b.some(S=>S.label===R.label)||b.push(R),b),[]);return G||void 0}},"."),s=p.languages.registerSignatureHelpProvider("modscript",{provideSignatureHelp(c,D,E,O){let P=new p.SignatureHelp,M=c.lineAt(D).text.substr(0,D.character),k=Ee(M+")"),A="";for(let g=0;g<k.length-1;g++)A=Ie(A+k[g],me[c.uri.toString()],ue[c.uri.toString()],fe[c.uri.toString()],D);M=A+k.pop()+M.match(/\(.*$/g)[0];var T=/((?<class>[A-Za-z0-9]+)[.])?(?<meathod>[A-Za-z0-9]+)\([A-Za-z0-9,.\"\\()]*?/gm,G=T.exec(M),b=Object.assign({},re);for(let g of fe[c.uri.toString()])b[g.className]=g;if(G){var R=[];if(G.groups.class&&b[G.groups.class])R.push(b[G.groups.class]);else{let g,_=c.lineCount+100;for(var S of me[c.uri.toString()])typeof S.type!="undefined"&&G.groups.class==S.variable&&S.range.contains(D)&&S.range.end.line-S.range.start.line<_&&(g=b[S.type],_=S.range.end.line-S.range.start.line);if(g&&R.push(g),R.length==0){R=_t;let r={className:"",exposed:!0,inheritsFrom:"",classDescription:"",meathods:ue[c.uri.toString()],properties:[]};R=R.concat(r)}}for(let g=0;g<R.length;g++)if(R[g]){for(let _ of R[g].meathods)if(G.groups.meathod==_.meathodName){let r="",te="";for(let K of _.meathodParms){let X=K.type;typeof X!="string"&&(X=X.join(","));let ie=K.name,V="@param";K.optional&&(ie=`[${ie}]`,V="@optional"),r+=`${V}\`${ie}\` **&lt;${X}&gt;** ${K.description}

`,te+=`${ie}<${X}>, `}te=te.slice(0,te.length-2);let ae=`@return **&lt;${_.meathodReturn}&gt;**
${_.meathodReturnDescription}`,L=`${_.meathodName}(${te}):<${_.meathodReturn}>`,se=new p.SignatureInformation(L,new p.MarkdownString(`${_.meathodDescription}

${r}

${ae}`));P.signatures.push(se)}}}return P}},"(",","),d=p.languages.registerHoverProvider("modscript",{provideHover(c,D,E){let O=c.getWordRangeAtPosition(D),P=c.lineAt(D).text.substr(O.start.character,O.end.character),M=null,k=c.lineCount+100;e:for(var A of me[c.uri.toString()])A.range.contains(D)&&(typeof A.type!="undefined"?P.match(new RegExp(`^${A.variable}(\\.|\\b)+`,"g"))&&A.range.end.line-A.range.start.line<k&&(M=new p.MarkdownString(`Variable of type: **${A.type}**`),k=A.range.end.line-A.range.start.line):P.match(new RegExp(`${A.variable}(\\.|\\b)+`,"g"))&&A.range.end.line-A.range.start.line<k&&(M=new p.MarkdownString("Variable of Unknown Type"),k=A.range.end.line-A.range.start.line));if(M)return new p.Hover(M)}}),m=p.languages.registerCompletionItemProvider("modscript",{provideCompletionItems(c,D,E,O){if(!c.lineAt(D).text.substr(0,D.character).match(/\/\/\s*(var|global)\s[A-Za-z0-9]+\sis\s$/g))return;let M=[];for(let[k,A]of Object.entries(re))if(A.className!=""){let T=new p.CompletionItem(A.className,p.CompletionItemKind.Class);T.commitCharacters=["."],T.documentation=new p.MarkdownString(A.classDescription),M.push(T)}return M}}," "),u=p.languages.registerCompletionItemProvider("modscript",{provideCompletionItems(c,D,E,O){if(!c.lineAt(D).text.substr(0,D.character).match(/^\s*\/\*\*/g))return;let M=[],k="Variant,";for(let[T,G]of Object.entries(re))G.className!=""&&G.className!="Variant"&&(k+=G.className+",");k=k.slice(0,-1);for(var A of ue[c.uri.toString()])if(A.range.contains(D)){let T=new p.CompletionItem("Meathod Documentation",p.CompletionItemKind.Snippet),G="\n * ${1:"+A.meathodName+` Meathod Description}
`,b=2;for(let R of A.meathodParms)R.type!="Variant"?G+=" * @param {${"+b+++"|"+R.type+","+k+"|}} ${"+b+++":"+R.name+` Paramater Description}
`:G+=" * @param {${"+b+++"|"+k+"|}} ${"+b+++":"+R.name+` Paramater Description}
`;G+=" * @returns {${"+b+++"|"+k+"|}} ${"+b+++`:Return Description}
 */`,T.insertText=new p.SnippetString(G),M.push(T)}if(M.length==0){let T=new p.CompletionItem("Meathod Documentation",p.CompletionItemKind.Snippet);T.insertText=new p.SnippetString("\n* ${1:Meathod Description}\n* @param {${2|"+k+"|}} ${3:Paramater Description}\n* @returns {${4|"+k+"|}} ${5:Return Description}\n*/"),M.push(T)}return M}},"*");t.subscriptions.push(e,o,s,d,m,u);var v;(function(P){P[P.None=0]="None",P[P.Test=1]="Test",P[P.Dev=2]="Dev",P[P.Prod=3]="Prod"})(v||(v={})),p.window.registerTreeDataProvider("composerExplorer",new $e(t)),setTimeout(()=>{W(p.window.activeTextEditor.document)},100),p.window.onDidChangeActiveTextEditor(Ut(c=>{W(c.document)},300,!1)),p.workspace.onDidChangeTextDocument(Ut(c=>{W(c.document)},300,!1));async function W(c){var a;if(c.languageId!="modscript")return;var D=/(?:var|global) (?<variable>[^\s,\.\(\\\/;]+) = (?<function>.+)/gm,E=/^\s*(?<variable>[^\s,\.\(\\\/;]+) = (?<function>[^\s,\(\\\/;]+)/gm,O=/\/\/(?:var|global) (?<variable>[^\s,\(\\\/;]+) is (?<type>[^\s,\(\\\/;]+)/gm,P=/^\s*def\s+(?<MeathodName>[\w]+)\((?<params>[\s\w,\s]*)\)\s*[^{]*{/g,M=/for\s*\(\s*(?<variable>[^\s,\.\(\\\/;]+)\s*:\s*(?<rangeType>[^\s,\.\(\\\/;]+)\s*\)\s*{/g,k=/^\s*class\s+(?<ClassName>[^\s,\.\(\\\/;]+)\s*{/g,A=/(?:var|attr) (?<variable>[^\s,\.\(\\\/;]+)/g,T=/this\.(?<variable>[^\s,\.\(\\\/;]+) = (?<function>.+)/g,G,b,R,S=[],g,_={},r,te=[],ae,L=[],se,K=[],X,ie,V=/^include\(\s*["'](?<import>[^,\(\\\/;]+)["']\s*\)/g,oe=[],de=[],ce=!1,z=null,Z=null,ne=null;de.push(new p.Range(c.lineAt(0).range.start,c.lineAt(c.lineCount-1).range.end)),oe.push(de[0]);for(let h=0;h<c.lineCount;h++){let n=c.lineAt(h).text;if(!(n.length>5e3)){if(ce)if(n.match(/^[\s\S]*\*\//g))ce=!1;else continue;else{if(n.match(/^[\s\S]*\/\*\*/g)){ce=!0,z={meathodName:"",meathodDescription:"",meathodParms:[],meathodReturn:"",meathodReturnDescription:""};for(let f=h;f<c.lineCount;f++){let y=c.lineAt(f).text;if(y.match(/^\s*\*\s+[\w]+/g))z.meathodDescription+=y.split("* ")[1]+" ";else if(y.match(/^\s*\*\s+@param {[\w]+}/g)){let N={name:"",type:y.split("{")[1].split("}")[0],description:"",optional:!1};y.split("}").length>1&&(N.description=y.split("}")[1].trim()),z.meathodParms.push(N)}else y.match(/^\s*\*\s+@returns {[\w]+}/g)&&(z.meathodReturn=y.split("{")[1].split("}")[0],y.split("}").length>1&&(z.meathodReturnDescription=y.split("}")[1].trim()));y.match(/^\s*\*\//g)&&(f=c.lineCount)}}else n.match(/^[\s\S]*\*\//g)&&(ce=!0);n.match(/^[\s\S]*\*\//g)&&(ce=!1,n=n.split("*/")[1])}for(let f=1;f<n.split("//")[0].split("{").length;f++){let y=new p.Range(c.lineAt(h).range.start,c.lineAt(h).range.start);for(let N of S)N.range||(N.range=oe[oe.length-1],oe.length==1?N.GlobalScope=!0:N.GlobalScope=!1);oe.push(y),(se=k.exec(n.split("//")[0]))&&(Z={className:se.groups.ClassName,exposed:!1,inheritsFrom:"",classDescription:"A custom class",meathods:[],properties:[]},ne=y)}for(let f=1;f<n.split("//")[0].split("}").length;f++){let y=oe.pop(),N=y.with(y.start,c.lineAt(h).range.end);de.push(N);for(let U of S)(!U.range||U.range==y)&&(U.range=N,U.GlobalScope=!1);ne&&N.start.isEqual(ne.start)&&(Z.range=N,K.push(Z),Z=null,ne=null)}for(;b=O.exec(n);){let f=!1;for(let y of S)y.variable==b.groups.variable&&((a=y==null?void 0:y.range)==null?void 0:a.contains(new p.Range(c.lineAt(h).range.start,c.lineAt(h).range.start)))&&(y.type=b.groups.type,f=!0);f||S.push(b.groups)}for(;R=M.exec(n.split("//")[0]);)R.groups.type="Unknown",S.push(R.groups);for(;r=V.exec(n.split("//")[0]);)te.push(r.groups.import);for(;G=D.exec(n.split("//")[0]);)S.push(G.groups);for(;X=A.exec(n.split("//")[0]);)ne&&ne.isEqual(oe[oe.length-1])&&Z.properties.push({propertyDescription:"",propertyName:X.groups.variable,propertyType:"",readOnly:!1});for(;ie=T.exec(n.split("//")[0]);)if(ne)for(let f of Z.properties)f.propertyName==ie.groups.variable&&(f.propertyType=ie.groups.function);for(;ae=P.exec(n.split("//")[0]);){let f={meathodName:ae.groups.MeathodName,meathodDescription:"User Defined Function",meathodParms:[],meathodReturn:"",meathodReturnDescription:""};z&&(f.meathodDescription=z.meathodDescription,f.meathodReturn=z.meathodReturn||"Void",f.meathodReturnDescription=z.meathodReturnDescription||""),ne&&Z.className==f.meathodName&&(f.meathodReturn=Z.className);let y=ae.groups.params,N=0;for(let x of y.split(","))if(x=x.trim(),x){let Q="Variant";x.split(/\s+/g).length>1&&(Q=x.split(/\s+/g)[0],x=x.split(/\s+/g)[1]);let J="";z&&z.meathodParms[N]&&(Q=z.meathodParms[N].type,J=z.meathodParms[N].description,N++);let ge={name:x,type:Q,description:J,optional:!1};f.meathodParms.push(ge),S.push({type:Q,variable:x,range:null,GlobalScope:!1,function:""})}z=null;let U=c.lineAt(h).range.start.line-3,C=c.lineAt(h).range.start.character;U>0?f.range=new p.Range(new p.Position(U,C),c.lineAt(h).range.start):f.range=new p.Range(c.lineAt(h).range.start,c.lineAt(h).range.start),ne&&Z.className!=f.meathodName?Z.meathods.push(f):L.push(f)}for(;g=E.exec(n);)_[g.groups.variable]||(_[g.groups.variable]=g.groups)}}for(let h of S)h.range||(h.range=de[0],oe.length==1?h.GlobalScope=!0:h.GlobalScope=!1);var $=[];let Re=!1;for(let h of te){let n=ee.join(ee.dirname(c.uri.toString()),"/",h+".tscm"),f=h+".tscm",y=null;for(let[C,x]of Object.entries(me))ee.normalize(C)==n&&(y=x);if(!y)for(let[C,x]of Object.entries(me))ee.normalize(C).includes(f)&&(y=x);if(y){let C=y;C=C.filter(x=>x.GlobalScope),C.forEach(x=>{x.range=de[0]}),$=$.concat(C),Re=!0}let N=null;for(let[C,x]of Object.entries(ue))ee.normalize(C)==n&&(N=x);if(!N)for(let[C,x]of Object.entries(ue))ee.normalize(C).includes(f)&&(N=x);N&&(L=L.concat(N),Re=!0);let U=null;for(let[C,x]of Object.entries(fe))ee.normalize(C)==n&&(U=x);if(!U)for(let[C,x]of Object.entries(fe))ee.normalize(C).includes(f)&&(U=x);if(U&&(K=K.concat(U),Re=!0),!Re)try{let C=await p.workspace.openTextDocument(p.Uri.parse(`${c.uri.with({path:ee.posix.dirname(c.uri.path)})}/${h}.tscm`));await W(C);let x=me[C.uri.toString()];x=x.filter(ge=>ge.GlobalScope),x.forEach(ge=>{ge.range=de[0]}),$=$.concat(x);let Q=ue[C.uri.toString()];L=L.concat(Q);let J=fe[C.uri.toString()];K=K.concat(J)}catch(C){console.error(`Include document: "${h}" was not found in the same folder. SKIPING.`)}}let Ae=[];for(var i of S){let h=!1;if(!i.type)if(i.function.match(/^"/g))i.type="string";else if(i.function.match(/^\d+\.\d+/g))i.type="double";else if(i.function.match(/^\d+/g))i.type="int";else if(i.function.match(/^(true|false|True|False|TRUE|FALSE){1}/g))i.type="bool";else if(i.function.match(/^\[/g))i.type="Vector";else if(i.function.match(/^Variant/g))_[i.variable]?i.type=Ie(_[i.variable].function,$,L,K,i.range.start.translate(1)):i.type="Variant";else{let n=Ee(i.function),f="";for(let y of n)f=Ie(f+y,$,L,K,i.range.start.translate(1));i.type=f,console.log(i.function,"  -  ",f,"  -  ["+n.toString()+"]")}for(let n of $)n.variable==i.variable&&n.range.isEqual(i.range)&&(n.type=i.type,h=!0);!h&&!i.rangeType?$.push(i):i.rangeType&&Ae.push(i)}for(let h of Ae)for(let n of $){let f=h.range.start.line;f>0&&f--,n.variable==h.rangeType&&n.range.contains(new p.Range(c.lineAt(f).range.start,c.lineAt(f).range.start))&&Ye[n.type]&&(h.type=Ye[n.type].innerType)}for(let h of K)for(let n of h.properties)if(n.propertyType){let f=Ee(n.propertyType),y="";for(let N of f)y=Ie(y+N,$,L,K,i.range.start.translate(1));n.propertyType=y,n.propertyDescription=`Property of type: **${y}**`}$=$.concat(Ae),me[c.uri.toString()]=$,ue[c.uri.toString()]=L,fe[c.uri.toString()]=K}}function Ee(t){var e=[];let o=[],s="";for(let d of t)if(d=="(")e.push(s),s="";else if(d==")"){s="";let m=e.pop();e.length==0&&o.push(m.match(/\S+$/g)[0])}else d=="."&&e.length==0&&s.includes(".")?(o.push(s.match(/\S+$/g)[0]),s="."):s+=d;return o}function Ie(t,e,o,s,d){if(t.includes("."))var m=t.split(".")[0],u=t.split(".")[1];else var m="",u=t;var v=Object.assign({},re);for(let c of s)v[c.className]=c;if(m.toLowerCase()=="this"){for(let c of s)if(c.range.contains(d)){m=c.className;break}}for(let[c,D]of Object.entries(v))if(D.className==m){if(D.meathods){for(let E of D.meathods)if(E.meathodName==u)return E==null?void 0:E.meathodReturn}if(D.properties){for(let E of D.properties)if(E.propertyName==u)return E==null?void 0:E.propertyType}}if(m==""){for(var W of o)if(W.meathodName==u)return W==null?void 0:W.meathodReturn}for(let c of e)if(c.variable==m&&c.range.contains(d)&&typeof c.type!="undefined"){for(let D of v[c.type].meathods)if(D.meathodName==u)return D==null?void 0:D.meathodReturn;if(v[c.type].properties){for(let D of v[c.type].properties)if(D.propertyName==u)return D==null?void 0:D.propertyType}}return null}var Ut=function(t,e,o){var s;return function(){var d=this,m=arguments,u=function(){s=null,o||t.apply(d,m)},v=o&&!s;clearTimeout(s),s=setTimeout(u,e),v&&t.apply(d,m)}};0&&(module.exports={activate});
/*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
