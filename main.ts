import {mkdirSync as md,readdirSync as ls,readFileSync as rf,writeFileSync as wf} from "node:fs";
import {join as j} from "node:path";
const I=process.env.MAKEFUN_INPUT_DIR??"/input",O=process.env.MAKEFUN_OUTPUT_DIR??"/output";
function run(P:Uint8Array,I:Uint8Array):[Uint8Array,number]{
 const L=P.length,S=new Int32Array(256),K=new Int32Array(64),M=new Int32Array(256),B=new Uint8Array(65536);
 let p=0,t=0,c=0,q=0,n=0,ol=0;
 const done=(e:number):[Uint8Array,number]=>[B.subarray(0,ol),e];
 for(;;){
  if(n===1e6)return done(10);
  if(p<0||p>=L)return done(9);
  const op=P[p];
  if(!((op<=7)||(op>=0x10&&op<=0x22)||(op>=0x30&&op<=0x34)||(op>=0x40&&op<=0x41)||(op>=0x50&&op<=0x53)))return done(5);
  const im=op===1?1:op===2?4:op>=0x30&&op<=0x33?2:0;
  if(p+1+im>L)return done(9);
  const pn=op===7?3:op===5||op===6||op===0x41||(op>=0x10&&op<=0x22&&op!==0x17&&op!==0x1b)?2:op===3||op===4||op===0x17||op===0x1b||op===0x31||op===0x32||op===0x40||(op>=0x50&&op!==0x52)?1:0;
  const qn=op===6||op===7?3:op===4||op===5?2:op===1||op===2||op===0x52||op===0x40||(op>=0x10&&op<=0x22)?1:0;
  if(t<pn)return done(2);
  if(t-pn+qn>256)return done(3);
  n++;
  const nx=p+1+im;
  p=nx;
  switch(op){
   case 0:return done(0);
   case 1:S[t++]=(P[nx-1]<<24)>>24;break;
   case 2:S[t++]=P[nx-4]|P[nx-3]<<8|P[nx-2]<<16|P[nx-1]<<24;break;
   case 3:t--;break;
   case 4:S[t]=S[t-1];t++;break;
   case 5:{const x=S[t-1];S[t-1]=S[t-2];S[t-2]=x;break;}
   case 6:S[t]=S[t-2];t++;break;
   case 7:{const x=S[t-3];S[t-3]=S[t-2];S[t-2]=S[t-1];S[t-1]=x;break;}
   case 0x17:S[t-1]=-S[t-1]|0;break;
   case 0x1b:S[t-1]=~S[t-1];break;
   case 0x10:case 0x11:case 0x12:case 0x13:case 0x14:case 0x15:case 0x16:case 0x18:case 0x19:case 0x1a:case 0x1c:case 0x1d:case 0x1e:case 0x20:case 0x21:case 0x22:{
    const b=S[t-1],a=S[t-2];let r=0;
    if(op===0x10)r=(a+b)|0;
    else if(op===0x11)r=(a-b)|0;
    else if(op===0x12)r=Math.imul(a,b);
    else if(op===0x13){if(!b)return done(4);r=(a/b)|0;}
    else if(op===0x14){if(!b)return done(4);r=(a%b)|0;}
    else if(op===0x15){if(!b)return done(4);r=(((a>>>0)-((a>>>0)%(b>>>0)))/(b>>>0))|0;}
    else if(op===0x16){if(!b)return done(4);r=((a>>>0)%(b>>>0))|0;}
    else if(op===0x18)r=a&b;
    else if(op===0x19)r=a|b;
    else if(op===0x1a)r=a^b;
    else if(op===0x1c)r=a<<(b&31);
    else if(op===0x1d)r=a>>(b&31);
    else if(op===0x1e)r=(a>>>(b&31))|0;
    else if(op===0x20)r=a===b?1:0;
    else if(op===0x21)r=a<b?1:0;
    else r=(a>>>0)<(b>>>0)?1:0;
    t-=2;S[t++]=r;break;}
   case 0x30:case 0x31:case 0x32:{
    const rel=((P[nx-2]|P[nx-1]<<8)<<16)>>16;
    if(op===0x30||(op===0x31)===(S[--t]===0))p=nx+rel;
    break;}
   case 0x33:if(c===64)return done(7);K[c++]=nx;p=P[nx-2]|P[nx-1]<<8;break;
   case 0x34:if(!c)return done(8);p=K[--c];break;
   case 0x40:{const ad=S[t-1];if(ad<0||ad>255)return done(6);S[t-1]=M[ad];break;}
   case 0x41:{const ad=S[t-1],v=S[t-2];if(ad<0||ad>255)return done(6);t-=2;M[ad]=v;break;}
   case 0x50:{const s=String(S[t-1]);if(ol+s.length>65536)return done(11);for(let i=0;i<s.length;i++)B[ol++]=s.charCodeAt(i);t--;break;}
   case 0x51:if(ol>=65536)return done(11);B[ol++]=S[--t]&255;break;
   case 0x52:S[t++]=q<I.length?I[q++]:-1;break;
   case 0x53:return done(S[--t]&255);
  }
 }
}
for(const id of ls(I).sort()){
 const g=run(rf(j(I,id,"program.bin")),rf(j(I,id,"input.bin")));
 md(j(O,id),{recursive:true});
 wf(j(O,id,"stdout.bin"),g[0]);
 wf(j(O,id,"exit.txt"),g[1]+"\n");
}
