document.addEventListener("DOMContentLoaded", function() {
    let gpu_bus_row=Array.from(document.querySelectorAll('tr')).filter(tr => tr.textContent.includes('PCI Bus Rx/Tx (MB/s)'));

    if (gpu_bus_row.length > 0) {
        gpu_bus_row[0].children[0].hidden=true;
    }
});