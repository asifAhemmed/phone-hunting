const loadPhones = async (phoneName = "13", isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${phoneName}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";
  const showAllButtonContainer = document.getElementById(
    "showAllButton-container"
  );
  if (phones.length > 8 && !isShowAll) {
    showAllButtonContainer.classList.remove("hidden");
  } else {
    showAllButtonContainer.classList.add("hidden");
  }
  if (!isShowAll) {
    phones = phones.slice(0, 9);
  }

  phones.forEach((phone) => {
    console.log(phone);
    const phoneCard = document.createElement("div");
    phoneCard.classList = "card  bg-gray-100  p-4 text-black";
    phoneCard.innerHTML = `
        <figure><img src=${phone.image} alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary text-white">Details</button>
          </div>
        </div>
        `;
    phoneContainer.appendChild(phoneCard);
  });
  toggleLoadingSpinner(false);
};

const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchfield = document.getElementById("input-field");
  const searchText = searchfield.value;
  loadPhones(searchText, isShowAll);
};

const handleShowDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  showPhoneDetails(data.data);
};
const showPhoneDetails = (phone) => {
  my_modal_5.showModal();
  console.log(phone);
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML =`
    <img class="mx-auto bg-sky-200 mb-10" src=${phone.image}>
    <p><span class="font-bold">Name :</span>  ${phone.name}</p>
    <p><span class="font-bold">Storage :</span> ${phone.mainFeatures.storage}</p>
    <p><span class="font-bold">Display Size :</span> ${phone.mainFeatures.displaySize}</p>
    <p><span class="font-bold">ChipSet :</span> ${phone.mainFeatures.chipSet}</p>
    <p><span class="font-bold">Memory :</span> ${phone.mainFeatures.memory}</p>
    <p><span class="font-bold">Slug :</span> ${phone.slug}</p>
    <p><span class="font-bold">Release Date :</span> ${phone.releaseDate}</p>
    <p><span class="font-bold">Brand :</span> ${phone.brand}</p>
    <p><span class="font-bold">Gps :</span> ${phone?.others?.GPS}</p>
    <div class="modal-action">
    <form method="dialog">
      <!-- if there is a button in form, it will close the modal -->
      <button class="btn btn-primary text-white">Close</button>
    </form>
  </div>
  `
};

const toggleLoadingSpinner = (isLoading) => {
  const spinner = document.getElementById("spinner-container");
  if (isLoading) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
};

const handleShowAll = () => {
  handleSearch(true);
};

loadPhones();
