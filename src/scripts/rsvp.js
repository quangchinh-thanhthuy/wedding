const rsvpUrl = "https://script.google.com/macros/s/AKfycbxn0aSgn3zAR9FVuM200IF2LWYR1Oa_fPzHNrkHWwE86gpEZ_VrvwhFZ16jlAUv0j6W2A/exec";

async function submitResponse() {
    const name = document.getElementById('rsvp-name').value;
    const leAnHoi = document.getElementById('checkbox-3').checked;
    const tiecCuoiNhaGai = document.getElementById('checkbox-1').checked;
    const tiecCuoiNhaTrai = document.getElementById('checkbox-2').checked;

    if(!name) return;
    
    const newRSVP = {
      name,
      leAnHoi,
      tiecCuoiNhaGai,
      tiecCuoiNhaTrai
    }
    try {
      Swal.fire({
        icon: "success",
        title: "Xác Nhận Tham Dự Thành Công",
        text: "Cảm ơn bạn đã xác nhận tham dự đám cưới của chúng tôi.",
      });
      
      await fetch(rsvpUrl, {
        redirect: "follow",
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(newRSVP),
      });
    } catch (error) {
        console.error('Error:', error);
    }
}