const allAtendBTNs = document.querySelectorAll(".attendBTN");

allAtendBTNs.forEach(butn => {
    butn.addEventListener("click", e => {
        const {userid, opptid} = e.target.dataset;
        console.log(userid, opptid);
        fetch(`/api/opportunities/${opptid}/addvolunteer/${userid}`, {
            method: "POST",
        }).then(res => {
            if(res.ok){
                location.href = `/oppts/${opptid}`
            } else {
                alert("trumpet sound")
            }
        })
    })
})

console.log("linked!");