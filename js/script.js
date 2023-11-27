expiration = new Date;
expiration.setMonth(expiration.getMonth()+12)
counter = eval(cookieVal("total_visited"))
counter++
document.cookie = "total_visited="+counter+";expires=" + expiration.toGMTString()
 
 
function cookieVal(cookieName) {
	thisCookie = document.cookie.split("; ")
	for (i=0; i<thisCookie.length; i++){
		if (cookieName == thisCookie[i].split("=")[0]){
			return thisCookie[i].split("=")[1]
		}
	}
	return 0;
}
 
document.getElementById('result').innerHTML = "<p>You've visited this page <label style=' color:#f68084 !important;' class='text-info'>"+counter+"</label> times.</p>";

// Sample project data
const projects = [
    {
        id: 'wordpress',
        title: 'WordPress Sites',
        description: 'User-friendly and customizable websites for blogs, businesses, and more.',
        features: ['Responsive design', 'SEO optimization'],
        price: 'Contact for pricing'
    },
    {
        id: 'wix',
        title: 'Wix Website Development',
        description: "Visually stunning and user-friendly websites with Wix's versatile platform.",
        features: ['Wix App integration', 'Mobile optimization'],
        price: 'Contact for pricing'
    },
    {
        id: 'shopify',
        title: 'Shopify E-commerce Stores',
        description: 'Powerful e-commerce solutions for your online retail business.',
        features: ['Product management', 'Secure payment integration'],
        price: 'Contact for pricing'
    },
    {
        id: 'custom',
        title: 'Custom Web Solutions',
        description: 'Need something unique? We create custom websites to match your exact requirements.',
        features: ['Advanced features', 'Tailored functionalities'],
        price: 'Contact for pricing'
    }
];

// Function to create a project card
function createProjectCard(project) {
    const card = document.createElement('div');
    card.classList.add('project-type-card');
    card.id = project.id;
    card.style.backgroundColor = getBackgroundColor(project.id);

    const title = document.createElement('h3');
    title.textContent = project.title;

    const desc = document.createElement('p');
    desc.textContent = project.description;

    const featuresList = document.createElement('ul');
    project.features.forEach(feature => {
        const featureItem = document.createElement('li');
        featureItem.textContent = feature;
        featuresList.appendChild(featureItem);
    });

    const price = document.createElement('p');
    price.textContent = project.price;

	const learnMoreButton = document.createElement('button');
    learnMoreButton.textContent = 'Learn More';
    learnMoreButton.classList.add('learn-more-button');
    learnMoreButton.addEventListener('click', () => showDetails(project.id));

    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(featuresList);
    card.appendChild(price);
    card.appendChild(learnMoreButton);

    return card;
}

// Function to get background color based on project id
function getBackgroundColor(id) {
    switch (id) {
        case 'wordpress':
            return '#f44336';
        case 'wix':
            return '#4CAF50';
        case 'shopify':
            return '#2196F3';
        case 'custom':
            return '#FF9800';
        default:
            return '#ccc'; // Default color
    }
}

// Function to initialize project cards
function initProjectCards() {
    const projectTypesContainer = document.getElementById('projectTypesContainer');

    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectTypesContainer.appendChild(projectCard);
    });
}

// Initialize project cards on page load
document.addEventListener('DOMContentLoaded', initProjectCards);


function showDetails(projectType) {
    const selectedProject = projects.find(project => project.id === projectType);

    // Example: Open a modal with project details
    const modalContent = `
        <h2>${selectedProject.title}</h2>
        <p>${selectedProject.description}</p>
        <ul>
            ${selectedProject.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
        <p>${selectedProject.price}</p>
        <button class="learn-more-button" onclick="openFacebookPage()">Learn More</button>
    `;

    openModal(modalContent);
}

function openFacebookPage() {
    // Open your Facebook page link using a script
    const newTab = window.open();
    newTab.location.href = 'https://www.facebook.com/mksbd2022';
}





// Example function to open a modal (replace this with your actual modal implementation)
function openModal(content) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = content;

    const closeModalButton = document.createElement('button');
    closeModalButton.textContent = 'Close';
    closeModalButton.addEventListener('click', () => {
        modal.remove();
    });

    modal.appendChild(closeModalButton);

    document.body.appendChild(modal);
}
