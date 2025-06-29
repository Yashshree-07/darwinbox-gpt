function loadComponent(name) {
    fetch(`components/${name}.html`)
        .then(res => res.text())
        .then(html => {
            document.getElementById('content').innerHTML = html;
            const script = document.createElement('script');
            script.src = `scripts/${name}.js`;
            document.body.appendChild(script);
        });
}