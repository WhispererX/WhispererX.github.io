Prism.languages.gml = {
  comment: [
    {
      // Single-line comments
      pattern: /\/\/.*/,
      greedy: true,
    },
    {
      // Multi-line comments
      pattern: /\/\*[\s\S]*?\*\//,
      greedy: true,
    },
  ],
  string: {
    // Strings with single or double quotes
    pattern: /(["'])(?:(?!\1)[^\\]|\\.)*\1/,
    greedy: true,
  },
  number: {
    // Numbers including decimals
    pattern: /\b\d+(\.\d+)?\b/,
  },
  keyword: {
    // Control flow and other keywords
    pattern:
      /\b(if|else|for|while|do|switch|case|default|break|continue|return|with|var|global|enum|repeat)\b/,
    greedy: true,
  },
  builtin: {
    // Built-in variables
    pattern:
      /\b(x|y|z|image_xscale|image_yscale|image_speed|image_alpha|room_width|room_height|mouse_x|mouse_y|speed)\b/,
    alias: "variable",
  },
  function: {
    // Built-in functions
    pattern: /\b[a-zA-Z_]\w*(?=\s*\()/,
    alias: "function",
  },
  operator: {
    // Operators
    pattern: /[+\-*/%!=<>|&]+/,
  },
  punctuation: {
    // Punctuation
    pattern: /[{}[\];(),.:]/,
  },
};

const copyButtons = document.getElementsByClassName("copy-button");

Array.from(copyButtons).forEach((btn) => {
  btn.addEventListener("click", function () {
    var codeId = btn.getAttribute("data-code");
    var code = document.getElementById(codeId).innerText;
    navigator.clipboard
      .writeText(code)
      .then(function () {
        btn.innerHTML = `<i class="bi bi-clipboard-check-fill"></i>`;
        setTimeout(function () {
          btn.innerHTML = `<i class="bi bi-clipboard-fill"></i>`;
        }, 1000);
      })
      .catch(function (error) {
        console.error("Failed to copy code to clipboard:", error);
      });
  });
});
