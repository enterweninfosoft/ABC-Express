const crypto=require('crypto-js');
const random=i=>crypto.lib.WordArray.random(i).toString(crypto.enc.HEX);
const generateRandomArray=n=>{
	let ar=new Array(n)
	for(let x=0;x<n;x++){
		ar[x]=Math.ceil(Math.random()*100)%122+48
	}
	return ar
}
const randomBool=()=>Math.ceil(Math.random()*100)%2
const encode=s=>{
	let len=s.length;
	let exp=0;
	while(parseInt(len)){
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
const decode=ar=>{
	let first_garbage=ar[0]==49
	let read_from=first_garbage?ar.length/2+ar[1]:2+ar[1]
	let s=''
	for(let x=0;x<ar.length/2-ar[1];x++){
		s+=(String.fromCharCode(ar[read_from+x]))
	}
	let next=read_from-ar[1]
	while(next<read_from){
		s+=String.fromCharCode(ar[next++])
	}
	return s
}
const message='password';
console.log('The message is: '+message);
const hash=crypto.SHA256(message);
const hash_str=hash.toString(crypto.enc.HEX);
console.log('Hash, which will be encrypted (with random key) is: '+hash_str);
const key=random(32);
console.log('The key(randomly generated) is: '+key)
const encrypted=crypto.AES.encrypt(hash_str,key);
const encrypted_str=encrypted.toString(crypto.enc.HEX);
console.log('encrypted string is: '+encrypted_str);
let encoded=encode(key);
let decoded=decode(encoded)
const decrypted=crypto.AES.decrypt(encrypted_str,decoded);
const decrypted_str=decrypted.toString(crypto.enc.Utf8);
console.log('The decrypted string is: '+decrypted_str);
let b=hash_str==decrypted_str;
console.log('Is it a match: '+b);
console.log('Decoded key: \t '+decoded)
console.log('Actual key: \t '+key)
b=decoded==key
console.log('Does the decoded key matches with Original one? '+b)
const send={
	username:'username',
	password:encrypted_str,
	key:encoded
}
console.log(JSON.stringify(send))
/*
DATA SENT TO SERVER IS
*username: String(simple)
*password: String(first hashed with SHA256, then the hash is encrypted with AES with some random key)
*key: Array(encoded encryption random key)
*/
