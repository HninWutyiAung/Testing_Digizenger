export let otherProfileDetail;

console.log(otherProfileDetail);

export const OtherProfileData = (data)=>{
    if(data){
        otherProfileDetail=data;
        console.log(otherProfileDetail);
    }
}