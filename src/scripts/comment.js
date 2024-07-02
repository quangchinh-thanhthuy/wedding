const apiUrl =
  "https://script.google.com/macros/s/AKfycbwS8ihECbMvvP0dH8WJY30ScxlDcwyhX3EniNLpJz7Rh0_5RLIebgXGZ8RpSDeBSi4qHw/exec";

const pastelColors = [
  "#973131",
  "#E0A75E",
  "#5A639C",
  "#7776B3",
  "#9B86BD",
  "#6F4E37",
  "#A67B5B",
];

function getRandomColor() {
  return pastelColors[Math.floor(Math.random() * pastelColors.length)];
}

async function loadComments() {
  try {
    const response = await fetch(apiUrl);
    const comments = await response.json();

    const commentBox = document.getElementById("comment-box");
    commentBox.innerHTML = "";

    comments.sort((a, b) => new Date(b.date) - new Date(a.date));

    comments.forEach((comment) => {
      const commentDiv = document.createElement("div");
      commentDiv.setAttribute("role", "button");
      commentDiv.className =
        "flex items-start w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-neutral-200 hover:bg-opacity-80 focus:bg-opacity-80 active:bg-opacity-80";

      const imgDiv = document.createElement("div");
      imgDiv.className = "mr-4";

      const img = document.createElement("img");
      img.src = comment.imageURL || setAvatar(comment.name);
      img.className = "h-10 w-10 rounded-full object-cover object-center";

      imgDiv.appendChild(img);
      commentDiv.appendChild(imgDiv);

      const textDiv = document.createElement("div");
      textDiv.className = "flex-1";

      const nameAndDateDiv = document.createElement("div");
      nameAndDateDiv.className = "flex items-center";

      const name = document.createElement("p");
      name.className =
        "inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold";
      name.textContent = comment.name;

      const date = document.createElement("p");
      date.className = "text-sm text-gray-600 dark:text-gray-400";
      const timeElement = document.createElement("time");
      timeElement.setAttribute("pubdate", "");
      timeElement.setAttribute("datetime", comment.date);
      timeElement.setAttribute(
        "title",
        new Date(comment.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
      timeElement.textContent = new Date(comment.date).toLocaleDateString(
        "en-US",
        { month: "short", day: "numeric", year: "numeric" }
      );
      date.appendChild(timeElement);

      nameAndDateDiv.appendChild(name);
      nameAndDateDiv.appendChild(date);
      textDiv.appendChild(nameAndDateDiv);

      const commentText = document.createElement("p");
      commentText.className =
        "block antialiased font-normal leading-normal text-gray-700 pt-1";
      commentText.textContent = comment.comment;

      textDiv.appendChild(commentText);
      commentDiv.appendChild(textDiv);

      commentBox.appendChild(commentDiv);
    });
  } catch (error) {
    console.log(error);
  }
}

async function submitComment() {
  const name = document.getElementById("name").value;
  const comment = document.getElementById("comment").value;
  if (!name || !comment) return;

  const imageURL = setAvatar(name);
  if (name && comment) {
    const newComment = { name, comment, imageURL };
    try {
      Swal.fire({
        icon: "success",
        title: "Gửi Lời Chúc Thành Công",
        text: "Cảm ơn bạn rất nhiều vì lời chúc mừng đám cưới đầy ý nghĩa!",
      });
      
      await fetch(apiUrl, {
        redirect: "follow",
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(newComment),
      });
    } catch (error) {
      console.log(error);
    }

    loadComments();
    document.getElementById("name").value = "";
    document.getElementById("comment").value = "";

    return;
  }
}

loadComments();

function getInitials(name) {
  return name
    ?.toString()
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase())[0];
}

function generateAvatar(name) {
  const initials = getInitials(name);
  const canvas = document.createElement("canvas");
  canvas.width = 50;
  canvas.height = 50;
  const context = canvas.getContext("2d");

  // Draw background
  context.fillStyle = getRandomColor(); // Background color
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Draw initials
  context.fillStyle = "#FFFFFF"; // Text color
  context.font = "bold 20px Arial";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(initials, canvas.width / 2, canvas.height / 2);

  // Return the data URL of the canvas
  return canvas.toDataURL("image/png");
}

function setAvatar(name) {
  return generateAvatar(name);
}
