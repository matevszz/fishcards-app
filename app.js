document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;

    if (path.includes('createFishcards.html')) {
        const btnAddFishcard = document.querySelector('.add');
        const liFishcard = document.querySelector('.fishcards');
        const btnSave = document.querySelector('.save');
        const title = document.querySelector('.title');
        const input = document.querySelector('input');

        const addFishcard = () => {
            if(input.value.length === 0) {
                alert('Wypełnij wszystkie obszary!');
            }
            else {
                const ul = document.createElement('ul');
                const input1 = document.createElement('input');
                input1.placeholder = 'Pojęcie';
                const input2 = document.createElement('input');
                input2.placeholder = 'Definicja';
                liFishcard.appendChild(ul);
                ul.appendChild(input1);
                ul.appendChild(input2);
            }
        }

        btnAddFishcard.addEventListener('click', addFishcard);

        btnSave.addEventListener('click', () => {
            if (title.value.length === 0) {
                alert('Wypełnij wszystkie obszary!');
            } else {
                const fishcards = Array.from(liFishcard.querySelectorAll('ul')).map(ul => {
                    const inputs = ul.querySelectorAll('input');
                    return {
                        pojecie: inputs[0].value,
                        definicja: inputs[1].value
                    };
                });

                // Zapisz dane do localStorage
                localStorage.setItem('title', title.value);
                localStorage.setItem('fishcards', JSON.stringify(fishcards));

                // Przekieruj do drugiej strony
                window.location.href = 'index.html';
            }
        });
    } 
    else if (path.includes('index.html')) {
        const main = document.querySelector('.main');

        const localTitle = localStorage.getItem('title');


            if(localTitle) {
                const ul = document.createElement('ul');
                ul.innerHTML = localTitle;
                main.appendChild(ul);
            }
    }
});