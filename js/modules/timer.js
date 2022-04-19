export default function initTimer() {
    let deadline = new Date('apr 27, 2022 18:00:00').getTime();

    let x = setInterval(() => {
        let now = new Date().getTime();
        let t = deadline - now;
        let days = Math.floor(t / (1000 * 60 * 60 * 24));
        let hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60));
        let minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((t % (1000 * 60)) / 1000);
        document.querySelector('[data-timer]').innerHTML = days + "d " 
        + hours + "h " + minutes + "m " + seconds + "s ";
            if (t < 0) {
                clearInterval(x);
                document.querySelector('[data-timer]').innerHTML = "EXPIRED";
            }
        }, 1000);
  }
  