const linksListElement = document.getElementById('linksList');

function loadLinks() {
    const links = JSON.parse(localStorage.getItem('links')) || [];
    links.forEach(link => addLinkToDOM(link.title, link.url));
}

function addLink() {
    const titleInput = document.getElementById('linkTitle');
    const urlInput = document.getElementById('linkURL');
    const title = titleInput.value.trim();
    const url = urlInput.value.trim();
    
    if (!title || !url) {
        alert('Por favor, introduce un título y una URL válidos.');
        return;
    }
    
    addLinkToDOM(title, url);
    saveLinkToLocalStorage(title, url);
    titleInput.value = '';
    urlInput.value = '';
}

function addLinkToDOM(title, url) {
    const linkItem = document.createElement('div');
    linkItem.classList.add('link-item');
    
    const linkElement = document.createElement('a');
    linkElement.href = url;
    linkElement.textContent = title;
    linkElement.target = '_blank';
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.classList.add('delete-button');
    deleteButton.onclick = () => deleteLink(linkItem, title, url);
    
    linkItem.appendChild(linkElement);
    linkItem.appendChild(deleteButton);
    linksListElement.appendChild(linkItem);
}

function saveLinkToLocalStorage(title, url) {
    const links = JSON.parse(localStorage.getItem('links')) || [];
    links.push({ title, url });
    localStorage.setItem('links', JSON.stringify(links));
}

function deleteLink(linkElement, title, url) {
    linksListElement.removeChild(linkElement);
    const links = JSON.parse(localStorage.getItem('links')) || [];
    const updatedLinks = links.filter(link => link.title !== title || link.url !== url);
    localStorage.setItem('links', JSON.stringify(updatedLinks));
}

// Cargar links al cargar la página
loadLinks();