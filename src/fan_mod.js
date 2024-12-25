document.addEventListener("DOMContentLoaded", function() {
    let fan_row=$("tbody[title=\"Fan Information\"]");

    if (fan_row.length > 0) {
        let fans=document.querySelectorAll('tbody[title="Fan Information"]')[0].rows[1].children[0].children
        for (let i=0; i < fans.length; i++) {
            if (fans[i].textContent=="FAN 1") {
                fans[i].textContent="CPU FAN 1";
            }

            if (fans[i].textContent=="FAN 2") {
                fans[i].textContent="PCH Fan";
            }

            if (fans[i].textContent=="FAN 3") {
                fans[i].textContent="CPU FAN 2";
            }
        }
    }
});