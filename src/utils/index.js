import crypto from 'crypto-js'
export const gebi=id=>document.getElementById(id)
export const postData=async (url,data)=>(fetch(url,{
	body: JSON.stringify(data),
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    mode: 'cors',
    redirect: 'follow',
    referrer: 'no-referrer',
  })
  .then(response => response.json()))

  /*
 FOR CRYPTOGRAPHIC PURPOSES 
  */
export const random=i=>crypto.lib.WordArray.random(i).toString(crypto.enc.HEX);
export const generateRandomArray=n=>{
	let ar=new Array(n)
	for(let x=0;x<n;x++){
		ar[x]=Math.ceil(Math.random()*100)%122+48
	}
	return ar
}
export const randomBool=()=>Math.ceil(Math.random()*100)%2
export const encode=s=>{
	let len=s.length;
	let exp=0;
	while(parseInt(len,10)){
		len/=10;
		exp+=10;
	}
	let r=Math.ceil(Math.random()*exp)%s.length,reader=0;
	let ar=new Array(s.length)
	for(let x=r;x<s.length;x++,reader++){
		ar[x]=s.charCodeAt(reader)
	}
	for(let x=0;x<r;x++)
		ar[x]=s.charCodeAt(reader++)
	let garbage=generateRandomArray(s.length-2);
	let b=randomBool()
	let unified=undefined
	unified=b?garbage.concat(ar):ar.concat(garbage)
	unified.unshift(b+48,r)
	return unified
}