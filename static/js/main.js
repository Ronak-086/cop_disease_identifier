

$(document).ready(function () {
    
const resultText = document.getElementById('gemini-response');

const apiKey = ""; // ⚠️ Only expose in safe environments

async function generateRemedies(predictionfrommmodel) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const payload = {
    contents: [
      {
        parts: [
          { text: `what should i do if my crops are ${predictionfrommmodel}` }
        ]
      }
    ]
  };

  try {
    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    const result = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
    return result;

  } catch (error) {
    console.error("Gemini API error:", error.response?.data || error.message);
    return "⚠️ Error fetching response from Gemini.";
  }
}

// After prediction is received, call Gemini and show result
async function handleGeminiSuggestion(predictionfrommmodel) {
    const explanation = await generateRemedies(predictionfrommmodel);
    console.log("Received from Gemini:", explanation);

    const responseBox = document.getElementById('gemini-response');
    responseBox.style.display = 'block';

    // Convert plain text into bullet points
    const lines = explanation.split(/\n|•|-|\*/).map(line => line.trim()).filter(line => line.length > 0);

    if (lines.length === 1) {
        responseBox.innerHTML = `<p>${lines[0]}</p>`;
    } else {
        const bulletHTML = lines.map(item => `<li>${item}</li>`).join('');
        responseBox.innerHTML = `<ul style="margin-top: 10px; padding-left: 20px;">${bulletHTML}</ul>`;
    }
}



    // Init
    $('.image-section').hide();
    $('.loader').hide();
    $('#result').hide();

    // Upload Preview
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageUpload").change(function () {
        $('.image-section').show();
        $('#btn-predict').show();
        $('#result').text('');
        $('#result').hide();
        readURL(this);
    });

    // Predict
    $('#btn-predict').click(function () {
        var form_data = new FormData($('#upload-file')[0]);

        // Show loading animation
        $(this).hide();
        $('.loader').show();

        // Make prediction by calling api /predict
        $.ajax({
            type: 'POST',
            url: '/predict',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
    $('.loader').hide();
    $('#result').fadeIn(600);
    $('#result').text(' Result: ' + data.prediction);
    handleGeminiSuggestion(data.prediction);  // send only prediction to Gemini
    console.log('Success!');
},
        });
    });
    

// You need to call handleGeminiSuggestion(predictionfrommmodel) after you get the prediction result.
// For example, after receiving the prediction from your model API, call:
    
});
// const resultText = document.getElementById('gemini-response');

// const apiKey = "AIzaSyCUVREy-pl7I97Kjj_5vmZdYYMj1DhOmrU"; // ⚠️ Only expose in safe environments

// async function generateRemedies(predictionfrommmodel) {
//   const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

//   const payload = {
//     contents: [
//       {
//         parts: [
//           { text: `what should i do if my crops are ${predictionfrommmodel}` }
//         ]
//       }
//     ]
//   };

//   try {
//     const response = await axios.post(url, payload, {
//       headers: {
//         "Content-Type": "application/json"
//       }
//     });

//     const result = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
//     return result;

//   } catch (error) {
//     console.error("Gemini API error:", error.response?.data || error.message);
//     return "⚠️ Error fetching response from Gemini.";
//   }
// }

// // After prediction is received, call Gemini and show result
// async function handleGeminiSuggestion(predictionfrommmodel) {
//     const explanation = await generateRemedies(predictionfrommmodel);
//     resultText.textContent = explanation;
// }

// // You need to call handleGeminiSuggestion(predictionfrommmodel) after you get the prediction result.
// // For example, after receiving the prediction from your model API, call:
// handleGeminiSuggestion(data);
