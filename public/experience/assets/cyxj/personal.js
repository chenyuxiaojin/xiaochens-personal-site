(() => {
  'use strict';
  const scenes = new Map(), done = new WeakSet();
  const review = new URLSearchParams(location.search).has('review');
  const errors=[];
  const api=window.CYXJ={capture(scene){if(scene.fragName)scenes.set(scene.fragName,scene)}};
  function canvasTexture(canvas){const t=new Texture(canvas);t.generateMipmaps=false;t.minFilter=Texture.LINEAR;t.magFilter=Texture.LINEAR;t.needsUpdate=true;return t}
  function makeTitle(){
    const canvas=document.createElement('canvas');canvas.width=2048;canvas.height=1024;
    const ctx=canvas.getContext('2d');ctx.fillStyle='#000';ctx.fillRect(0,0,2048,1024);ctx.fillStyle='#fff';ctx.textAlign='center';ctx.textBaseline='middle';
    const lines=[{text:'THE',y:160,size:135,w:0.46,h:.16,baseline:.43},{text:'陈与小金',y:465,size:310,w:1.94,h:.55,baseline:0},{text:'EXPERIENCE',y:820,size:205,w:1.86,h:.35,baseline:-.45}];
    const a={position:[],uv:[],charindex:[],charsperline:[],row:[]};
    lines.forEach((line,row)=>{const count=line.text.length;
      ctx.font=`${row===1?'900':'400'} ${line.size}px ${row===1?'"Songti SC", "STSong", serif':'"Charles Rosie Regular", Georgia, serif'}`;
      const widths=[...line.text].map(char=>ctx.measureText(char).width+line.size*.05),total=widths.reduce((a,b)=>a+b,0);let advance=0;
      [...line.text].forEach((char,i)=>{const width=widths[i];ctx.fillText(char,advance+width/2,line.y);
        const x0=-line.w/2+advance/total*line.w,x1=x0+width/total*line.w,y0=line.baseline-line.h/2,y1=line.baseline+line.h/2;
        const v0=1-(line.y+line.size*.65)/1024,v1=1-(line.y-line.size*.65)/1024,u0=advance/2048,u1=(advance+width)/2048;advance+=width;
        for(const [x,y,u,v] of [[x0,y0,u0,v0],[x1,y0,u1,v0],[x1,y1,u1,v1],[x0,y0,u0,v0],[x1,y1,u1,v1],[x0,y1,u0,v1]]){a.position.push(x,y,0);a.uv.push(u,v);a.charindex.push(i);a.charsperline.push(count);a.row.push(row)}
      })
    });
    const g=new Geometry();for(const [key,array] of Object.entries(a))g.addAttribute(key,new GeometryAttribute(new Float32Array(array),key==='position'?3:key==='uv'?2:1));
    const distance=document.createElement('canvas');distance.width=128;distance.height=128;const d=distance.getContext('2d'),grad=d.createLinearGradient(0,0,128,128);grad.addColorStop(0,'#888');grad.addColorStop(1,'#fff');d.fillStyle=grad;d.fillRect(0,0,128,128);
    return {geometry:g,opacity:canvasTexture(canvas),distance:canvasTexture(distance)};
  }
  function makeLogo(){const c=document.createElement('canvas');c.width=572;c.height=240;const x=c.getContext('2d');x.fillStyle='white';x.textAlign='left';x.textBaseline='middle';x.font='900 90px "Songti SC",serif';x.fillText('陈与小金',12,90,550);x.font='26px Georgia';x.fillText('MAKE SOMETHING REAL.',16,180);return canvasTexture(c)}
  let panel,status;
  function buildReview(){
    panel=document.createElement('aside');panel.className='cyxj-review';panel.innerHTML='<button aria-expanded="false" class="review-toggle">交互核验</button><div class="review-body" hidden><p>沿用原站引擎 · 点击跳至真实场景</p><div class="review-buttons"></div><output aria-live="polite"></output></div>';
    document.body.append(panel);const toggle=panel.querySelector('button'),body=panel.querySelector('.review-body');toggle.onclick=()=>{body.hidden=!body.hidden;toggle.setAttribute('aria-expanded',String(!body.hidden))};status=panel.querySelector('output');
    const list=[['WanderScene','片头与行走'],['ProfileScene','人物特写'],['ApproachScene','接近拱门'],['NearScene','空间透视'],['HandScene','长按手部与液体'],['TargetScene','穿越入口'],['CathedralScene','建筑推进'],['DrinkSelectionScene','选择人物',0.10],['DrinkSelectionScene','三分支选择'],['DrinkPourScene','倾倒与粒子'],['AntiGravityScene','反重力'],['PillarCrumbleScene','立柱碎裂'],['ColosseumScene','环形空间'],['TasteScene','片尾转场'],['ProductsScene','产品旋转'],['RetailScene','作品与入口'],['FooterScene','页尾']];
    for(const [name,label,offset] of list){const b=document.createElement('button');b.textContent=label;b.onclick=()=>{const scene=scenes.get(name),ui=scene?.ui?.element?.div;if(ui&&window.Global?.SCROLL){Global.SCROLL.scrollTo(ui.offsetTop+Stage.height*(offset??(name==='DrinkSelectionScene'?1.25:['ProfileScene','ProductsScene'].includes(name)?0:.35)),'y',700,'easeOutCubic');body.hidden=true;toggle.setAttribute('aria-expanded','false')}};panel.querySelector('.review-buttons').append(b)}
  }
  function tick(){
    if(!window.Shader||!window.Utils3D)return;
    for(const [name,scene] of scenes){
      try {
        if(name==='FooterUI'&&scene.element?.div&&!done.has(scene)){const img=scene.element.div.querySelector('.footer-logo img');if(img){img.src='assets/cyxj/wordmark.svg';img.alt='陈与小金';done.add(scene)}}
        if(name==='Header'&&scene.logoShader&&!done.has(scene)){scene.logoShader.uniforms.tLogo.value=makeLogo();done.add(scene)}
        if(name==='WanderScene'&&scene.title&&scene.skin&&!done.has(scene)){const title=makeTitle();scene.title.geometry=title.geometry;scene.title.shader.uniforms.tOpacity.value=title.opacity;scene.title.shader.uniforms.tDistance.value=title.distance;scene.title.upload();done.add(scene)}
      } catch(e){done.add(scene);errors.push(name+': '+e.message);console.error('CYXJ adaptation:',name,e)}
    }
    if(review&&document.body&&!panel)buildReview();
    if(status){const story=scenes.get('Story');status.textContent=JSON.stringify({visible:story?.state?.get?.('visibleScenes')??[],selected:scenes.get('DrinkSelectionScene')?.getSync?.('Global/selectedBottle'),canSelect:scenes.get('DrinkSelectionScene')?.canInteract,slide:scenes.get('ProductsScene')?.slider?.elapsed,errors});}
  }
  setInterval(tick,250);
})();
