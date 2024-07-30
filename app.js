document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;

    if (path.includes('createFishcards.html')) {
        const btnAddFishcard = document.querySelector('.add');
        const liFishcard = document.querySelector('.fishcards');
        const btnSave = document.querySelector('.save');
        const titles = document.querySelector('.title');
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
            if (titles.value.length === 0) {
                alert('Wypełnij wszystkie obszary!');
            } else {
                const fishcards = Array.from(liFishcard.querySelectorAll('ul')).map(ul => {
                    const inputs = ul.querySelectorAll('input');
                    return {
                        pojecie: inputs[0].value,
                        definicja: inputs[1].value
                    };
                });

                const existingTitles = JSON.parse(localStorage.getItem('titles')) || [];
                const existingFishcards = JSON.parse(localStorage.getItem('fishcards')) || [];

                // Dodaj nowy tytuł i fishcards do istniejących danych
                const updatedTitles = [...existingTitles, titles.value];
                const updatedFishcards = {
                    ...existingFishcards,
                    [titles.value]: fishcards
                }

                // Zapisz zaktualizowane dane do localStorage
                localStorage.setItem('titles', JSON.stringify(updatedTitles));
                localStorage.setItem('fishcards', JSON.stringify(updatedFishcards));

                // Przekieruj do drugiej strony
                window.location.href = 'index.html';
            }
        });
    } 
    else if (path.includes('index.html')) {
        const main = document.querySelector('.main');

        const localTitles = JSON.parse(localStorage.getItem('titles')) || [];
        const localFishcards = JSON.parse(localStorage.getItem('fishcards')) || {};

        const deleteTitle = (title) => {
            const updatedTitles = localTitles.filter(t => t !== title);
            delete localFishcards[title];

            localStorage.setItem('titles', JSON.stringify(updatedTitles));
            localStorage.setItem('fishcards', JSON.stringify(localFishcards));

            window.location.reload();
        };

        localTitles.forEach(title => {
            const titleElement = document.createElement('ul');
            titleElement.textContent = title;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'X';
            deleteBtn.classList.add('deleteBtn');
            deleteBtn.addEventListener('click', () => {
                deleteTitle(title);
            });

            titleElement.appendChild(deleteBtn);
            main.appendChild(titleElement);
            });


            if(localTitles.length === 0) {
                document.querySelector('.main').style.display = 'none';
                document.querySelector('.no-fish').style.display = 'flex';
            }
            else {
                document.querySelector('.main').style.display = 'block';
                document.querySelector('.no-fish').style.display = 'none';
            }
        }
});

console.log('gowno');