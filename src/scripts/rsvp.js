const rsvpUrl = "https://script.google.com/macros/s/AKfycbwT6DQL3Whbyi6MeEDs9VEXeFH4HbqW8qB5ZqvxGp5K8qnk6x-AkhA6nJkYxr0NzX0DtQ/exec";
  
async function submitResponse() {
    const name = document.getElementById('rsvp-name').value;
    const leAnHoi = document.getElementById('checkbox-3').checked;
    const tiecCuoiNhaGai = document.getElementById('checkbox-1').checked;
    const tiecCuoiNhaTrai = document.getElementById('checkbox-2').checked;

    const newRSVP = {
      name,
      leAnHoi,
      tiecCuoiNhaGai,
      tiecCuoiNhaTrai
    }
    try {
      await fetch(rsvpUrl, {
        redirect: "follow",
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(newRSVP),
      });
      Swal.fire({
        icon: "success",
        title: "Xác Nhận Tham Dự Thành Công",
        text: "Cảm ơn bạn đã xác nhận tham dự đám cưới của chúng tôi.",
      });
    } catch (error) {
        console.error('Error:', error);
    }
}