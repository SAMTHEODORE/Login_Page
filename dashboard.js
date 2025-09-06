const fileInput = document.getElementById("fileInput");
    const gallery = document.getElementById("gallery");

    window.addEventListener("load", () => {
      const savedImages = JSON.parse(localStorage.getItem("galleryImages")) || [];
      savedImages.forEach(src => addImageToGallery(src, false));

      // Add single floating heart
      const heart = document.createElement("div");
      heart.classList.add("big-heart");
      heart.innerText = "❤️";
      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 5000);
    });

    fileInput.addEventListener("change", function(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          addImageToGallery(e.target.result, true);
        }
        reader.readAsDataURL(file);
      }
    });

    function addImageToGallery(src, save=false) {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "Added Photo";
      img.addEventListener("click", () => {
        if(confirm("Do you want to remove this image?")) {
          img.remove();
          removeImageFromStorage(src);
        }
      });
      gallery.appendChild(img);
      if(save) {
        let savedImages = JSON.parse(localStorage.getItem("galleryImages")) || [];
        savedImages.push(src);
        localStorage.setItem("galleryImages", JSON.stringify(savedImages));
      }
    }

    function removeImageFromStorage(src) {
      let savedImages = JSON.parse(localStorage.getItem("galleryImages")) || [];
      savedImages = savedImages.filter(img => img !== src);
      localStorage.setItem("galleryImages", JSON.stringify(savedImages));
    }