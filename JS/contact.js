document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formButtons = document.querySelectorAll('.console-buttons span');
    
    function createModal(mailtoLink, formData) {
        const modal = document.createElement('div');
        modal.className = 'email-modal';
        
        // Construire l'URL Gmail avec tous les paramètres
        const gmailSubject = formData.get('subject') === 'cv' ? 'Demande de CV' : 
                           formData.get('subject') === 'project' ? 'Proposition de projet' : 
                           'Contact Portfolio';
        
        const gmailBody = `
De: ${formData.get('name')}
Email: ${formData.get('email')}

Message:
${formData.get('message')}`;

        const gmailUrl = `https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=${encodeURIComponent('francois.lefevre@enigma-school.com')}&su=${encodeURIComponent(gmailSubject)}&body=${encodeURIComponent(gmailBody)}`;

        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Envoyer le message</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <p>Choisissez comment envoyer votre message :</p>
                    <div class="modal-buttons">
                        <a href="${mailtoLink}" class="modal-btn default-client">
                            Client mail par défaut
                        </a>
                        <a href="${gmailUrl}" target="_blank" class="modal-btn gmail">
                            Gmail
                        </a>
                        <button class="modal-btn copy-text">
                            Copier le texte
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Gérer la fermeture
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.onclick = () => modal.remove();

        // Fermer en cliquant en dehors
        modal.onclick = (e) => {
            if (e.target === modal) modal.remove();
        };

        // Gérer le bouton de copie
        const copyBtn = modal.querySelector('.copy-text');
        copyBtn.onclick = () => {
            const textToCopy = `
De: ${formData.get('name')}
Email: ${formData.get('email')}

${formData.get('message')}
            `.trim();
            
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    copyBtn.textContent = 'Copié !';
                    setTimeout(() => {
                        copyBtn.textContent = 'Copier le texte';
                    }, 2000);
                });
        };
    }

    // Gestion du formulaire
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            
            // Construction du sujet
            let emailSubject = formData.get('subject') === 'cv' ? 'Demande de CV' : 
                            formData.get('subject') === 'project' ? 'Proposition de projet' : 
                            'Contact Portfolio';
            
            // Construction du corps du message
            const emailBody = `
De: ${formData.get('name')}
Email: ${formData.get('email')}

Message:
${formData.get('message')}`;
            
            // Création du lien mailto
            const mailtoLink = `mailto:francois.lefevre@enigma-school.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
            
            // Afficher la modal
            createModal(mailtoLink, formData);
            
            // Animation du bouton
            const submitBtn = contactForm.querySelector('.submit-btn');
            submitBtn.textContent = 'Message prêt !';
            submitBtn.style.backgroundColor = '#28a745';
            
            // Réinitialisation après délai
            setTimeout(() => {
                submitBtn.textContent = './send.exe';
                submitBtn.style.backgroundColor = '#E6DB74';
            }, 2000);
        });

        // Animation des champs
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.previousElementSibling.style.color = '#E6DB74';
            });
            
            input.addEventListener('blur', function() {
                this.previousElementSibling.style.color = '#E6DB74';
            });
        });
    }
});