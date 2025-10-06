// Actualiza app.js para incluir el helper
// Reemplaza la configuración de Handlebars con esto:

app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  helpers: {
    multiply: (a, b) => a * b
  }
}));