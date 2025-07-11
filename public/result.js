// Global variables
let currentPage = 1;
const mockData = {
    patient: {
        id: "PT-2024-001",
        name: "dipa das",
        age: 52,
        gender: "Female",
        reportDate: new Date().toLocaleString()
    },
    
    aiSummary: "Based on comprehensive multi-modal analysis combining mammography, ultrasound, and fusion imaging techniques, our AI system has identified suspicious characteristics consistent with malignant tissue. The tumor presents with irregular margins, heterogeneous echo patterns, and microcalcifications typical of invasive ductal carcinoma. Confidence metrics indicate high certainty in malignant classification with supporting evidence from all imaging modalities.",
    
    parameters: [
        { parameter: "Tumor Size", value: "2.3 cm", status: "elevated" },
        { parameter: "BI-RADS Category", value: "5", status: "critical" },
        { parameter: "Density", value: "Heterogeneously Dense", status: "elevated" },
        { parameter: "Vascularity", value: "Increased", status: "elevated" },
        { parameter: "Shape", value: "Irregular", status: "critical" },
        { parameter: "Orientation", value: "Non-parallel", status: "elevated" }
    ],
    
    observations: [
        { feature: "Margins", finding: "Spiculated", significance: "High" },
        { feature: "Echo Pattern", finding: "Heterogeneous", significance: "Medium" },
        { feature: "Calcifications", finding: "Clustered microcalcifications", significance: "High" },
        { feature: "Posterior Features", finding: "Acoustic shadowing", significance: "Medium" },
        { feature: "Doppler Flow", finding: "Increased vascularity", significance: "High" },
        { feature: "Skin Changes", finding: "None detected", significance: "Low" }
    ],
    
    assessment: {
        prediction: "Malignant",
        riskLevel: "High",
        confidence: 94.2,
        recommendation: "Immediate biopsy and oncology consultation recommended"
    }
};
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    loadPatientData();
    loadTables();
    loadAssessment();

    initializeCharts();
    

    updatePageState();
});

function showPage(pageNum) {
    currentPage = pageNum;
    

    document.getElementById('page1').classList.add('hidden');
    document.getElementById('page2').classList.add('hidden');
    

    document.getElementById(`page${pageNum}`).classList.remove('hidden');
    
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`page${pageNum}-btn`).classList.add('active');

    updatePageState();

    if (pageNum === 2) {
        setTimeout(() => {
            initializePage2Charts();
        }, 100);
    }
}

function nextPage() {
    if (currentPage < 2) {
        showPage(currentPage + 1);
    }
}

function previousPage() {
    if (currentPage > 1) {
        showPage(currentPage - 1);
    }
}

function updatePageState() {
    document.getElementById('current-page').textContent = currentPage;

    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === 2;
}

function loadPatientData() {
    document.getElementById('patient-id').textContent = mockData.patient.id;
    document.getElementById('patient-name').textContent = mockData.patient.name;
    document.getElementById('patient-age').textContent = `${mockData.patient.age} years`;
    document.getElementById('patient-gender').textContent = mockData.patient.gender;
    document.getElementById('report-date').textContent = mockData.patient.reportDate;
    document.getElementById('ai-summary-text').textContent = mockData.aiSummary;
}

function loadTables() {

    const parametersTable = document.getElementById('parameters-table');
    parametersTable.innerHTML = '';
    
    mockData.parameters.forEach(param => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="font-weight: 500;">${param.parameter}</td>
            <td>${param.value}</td>
            <td>
                <span class="status-badge ${param.status}">
                    ${param.status}
                </span>
            </td>
        `;
        parametersTable.appendChild(row);
    });
    
    const observationsTable = document.getElementById('observations-table');
    observationsTable.innerHTML = '';
    
    mockData.observations.forEach(obs => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="font-weight: 500;">${obs.feature}</td>
            <td>${obs.finding}</td>
            <td>
                <span class="significance-badge ${obs.significance.toLowerCase()}">
                    ${obs.significance}
                </span>
            </td>
        `;
        observationsTable.appendChild(row);
    });
}

function loadAssessment() {
    document.getElementById('prediction').textContent = mockData.assessment.prediction;
    document.getElementById('risk-level').textContent = mockData.assessment.riskLevel;
    document.getElementById('confidence').textContent = `${mockData.assessment.confidence}%`;
    document.getElementById('recommendation').textContent = mockData.assessment.recommendation;
}

function initializeCharts() {
    drawConfidenceChart();
    drawPredictionChart();
}

function initializePage2Charts() {
    drawModalityChart();
    drawROCChart();
    drawConfusionMatrix();
    drawAccuracyChart();
    drawLossChart();
    drawClassAccuracyChart();
}

function drawConfidenceChart() {
    const canvas = document.getElementById('confidence-chart');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 70;
    const confidence = mockData.assessment.confidence;
    

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 12;
    ctx.stroke();
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (2 * Math.PI * confidence / 100);
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 24px Poppins';
    ctx.textAlign = 'center';
    ctx.fillText(`${confidence}%`, centerX, centerY + 8);
    
    ctx.font = '12px Poppins';
    ctx.fillStyle = '#6b7280';
    ctx.fillText('AI Confidence', centerX, centerY + 35);
}

function drawPredictionChart() {
    const canvas = document.getElementById('prediction-chart');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 60;
    
    const data = [
        { label: 'Malignant', value: 94.2, color: '#ef4444' },
        { label: 'Benign', value: 5.8, color: '#10b981' }
    ];

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let currentAngle = -Math.PI / 2;
    
    data.forEach(item => {
        const sliceAngle = (item.value / 100) * 2 * Math.PI;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = item.color;
        ctx.fill();
        
        currentAngle += sliceAngle;
    });
    let legendY = canvas.height - 60;
    data.forEach(item => {
        ctx.fillStyle = item.color;
        ctx.fillRect(centerX - 60, legendY, 12, 12);
   
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px Poppins';
        ctx.textAlign = 'left';
        ctx.fillText(`${item.label}: ${item.value}%`, centerX - 45, legendY + 10);
        legendY += 20;
    });
}

function drawModalityChart() {
    const canvas = document.getElementById('modality-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const data = [
        { label: 'Mammography', value: 87.5 },
        { label: 'Ultrasound', value: 91.2 },
        { label: 'Fusion', value: 94.2 }
    ];
    
    const barHeight = 40;
    const barSpacing = 60;
    const maxValue = Math.max(...data.map(d => d.value));
    const chartWidth = canvas.width - 200;
    const startX = 150;
    const startY = 50;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    data.forEach((item, index) => {
        const y = startY + index * barSpacing;
        const barWidth = (item.value / maxValue) * chartWidth;

        ctx.fillStyle = '#374151';
        ctx.font = '14px Poppins';
        ctx.textAlign = 'right';
        ctx.fillText(item.label, startX - 10, y + barHeight / 2 + 5);
        

        ctx.fillStyle = '#e5e7eb';
        ctx.fillRect(startX, y, chartWidth, barHeight);
        

        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(startX, y, barWidth, barHeight);
        
        // Draw value
        ctx.fillStyle = 'white';
        ctx.font = 'bold 12px Poppins';
        ctx.textAlign = 'center';
        ctx.fillText(`${item.value}%`, startX + barWidth - 30, y + barHeight / 2 + 4);
    });
}

function drawROCChart() {
    const canvas = document.getElementById('roc-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const padding = 40;
    const chartWidth = canvas.width - 2 * padding;
    const chartHeight = canvas.height - 2 * padding;
    

    const rocData = [];
    for (let i = 0; i <= 20; i++) {
        const fpr = i / 20;
        const tpr = Math.min(1, fpr + 0.3 + Math.random() * 0.4);
        rocData.push({ fpr, tpr });
    }
    

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    

    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();
    

    ctx.strokeStyle = '#9ca3af';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, padding);
    ctx.stroke();
    ctx.setLineDash([]);
    

    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    rocData.forEach((point, index) => {
        const x = padding + point.fpr * chartWidth;
        const y = canvas.height - padding - point.tpr * chartHeight;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    

    ctx.fillStyle = '#6b7280';
    ctx.font = '12px Poppins';
    ctx.textAlign = 'center';
    ctx.fillText('False Positive Rate', canvas.width / 2, canvas.height - 10);
    
    ctx.save();
    ctx.translate(15, canvas.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('True Positive Rate', 0, 0);
    ctx.restore();
    

    ctx.textAlign = 'center';
    ctx.fillText('AUC = 0.947', canvas.width / 2, canvas.height - 25);
}

function drawConfusionMatrix() {
    const container = document.getElementById('confusion-matrix');
    if (!container) return;
    
    const matrix = {
        truePositive: 142,
        falsePositive: 8,
        trueNegative: 156,
        falseNegative: 6
    };
    
    const total = matrix.truePositive + matrix.falsePositive + matrix.trueNegative + matrix.falseNegative;
    
    container.innerHTML = `
        <div class="matrix-cell" style="background-color: rgba(34, 197, 94, ${Math.max(0.3, matrix.truePositive / total)});">
            <div class="value">${matrix.truePositive}</div>
            <div class="label">True Positive</div>
        </div>
        <div class="matrix-cell" style="background-color: rgba(239, 68, 68, ${Math.max(0.3, matrix.falsePositive / total)});">
            <div class="value">${matrix.falsePositive}</div>
            <div class="label">False Positive</div>
        </div>
        <div class="matrix-cell" style="background-color: rgba(239, 68, 68, ${Math.max(0.3, matrix.falseNegative / total)});">
            <div class="value">${matrix.falseNegative}</div>
            <div class="label">False Negative</div>
        </div>
        <div class="matrix-cell" style="background-color: rgba(34, 197, 94, ${Math.max(0.3, matrix.trueNegative / total)});">
            <div class="value">${matrix.trueNegative}</div>
            <div class="label">True Negative</div>
        </div>
        <div class="matrix-stats">
            <div>Accuracy: ${(((matrix.truePositive + matrix.trueNegative) / total) * 100).toFixed(1)}%</div>
            <div>Precision: ${((matrix.truePositive / (matrix.truePositive + matrix.falsePositive)) * 100).toFixed(1)}%</div>
            <div>Recall: ${((matrix.truePositive / (matrix.truePositive + matrix.falseNegative)) * 100).toFixed(1)}%</div>
        </div>
    `;
}

function drawAccuracyChart() {
    const canvas = document.getElementById('accuracy-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    

    const epochs = 10;
    const accuracyData = [];
    for (let i = 1; i <= epochs; i++) {
        accuracyData.push({
            epoch: i,
            value: 0.65 + (0.29 * (i / epochs)) + Math.random() * 0.05
        });
    }
    
    drawLineChart(ctx, canvas, accuracyData, '#10b981', 'Training Accuracy');
}

function drawLossChart() {
    const canvas = document.getElementById('loss-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    

    const epochs = 10;
    const lossData = [];
    for (let i = 1; i <= epochs; i++) {
        lossData.push({
            epoch: i,
            value: 0.85 - (0.7 * (i / epochs)) + Math.random() * 0.05
        });
    }
    
    drawLineChart(ctx, canvas, lossData, '#ef4444', 'Training Loss');
}

function drawClassAccuracyChart() {
    const canvas = document.getElementById('class-accuracy-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const data = [
        { label: 'Benign', value: 96.1 },
        { label: 'Malignant', value: 94.2 },
        { label: 'Normal', value: 98.3 }
    ];
    
    const barHeight = 40;
    const barSpacing = 80;
    const maxValue = Math.max(...data.map(d => d.value));
    const chartWidth = canvas.width - 200;
    const startX = 120;
    const startY = 50;
    

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    data.forEach((item, index) => {
        const y = startY + index * barSpacing;
        const barWidth = (item.value / maxValue) * chartWidth;
        

        ctx.fillStyle = '#374151';
        ctx.font = '14px Poppins';
        ctx.textAlign = 'right';
        ctx.fillText(item.label, startX - 10, y + barHeight / 2 + 5);
        
  
        ctx.fillStyle = '#e5e7eb';
        ctx.fillRect(startX, y, chartWidth, barHeight);
        

        ctx.fillStyle = '#8b5cf6';
        ctx.fillRect(startX, y, barWidth, barHeight);
        
    
        ctx.fillStyle = 'white';
        ctx.font = 'bold 12px Poppins';
        ctx.textAlign = 'center';
        ctx.fillText(`${item.value}%`, startX + barWidth - 30, y + barHeight / 2 + 4);
    });
}

function drawLineChart(ctx, canvas, data, color, label) {
    const padding = 40;
    const chartWidth = canvas.width - 2 * padding;
    const chartHeight = canvas.height - 2 * padding - 40; // Extra space for labels
    
    const maxValue = Math.max(...data.map(d => d.value));
    const minValue = Math.min(...data.map(d => d.value));
    const valueRange = maxValue - minValue;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    

    ctx.strokeStyle = '#f3f4f6';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = padding + (i / 5) * chartHeight;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(canvas.width - padding, y);
        ctx.stroke();
    }
    

    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding - 20);
    ctx.lineTo(canvas.width - padding, canvas.height - padding - 20);
    ctx.stroke();
    
   
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    data.forEach((point, index) => {
        const x = padding + (index / (data.length - 1)) * chartWidth;
        const y = padding + chartHeight - ((point.value - minValue) / valueRange) * chartHeight;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    

    ctx.fillStyle = color;
    data.forEach((point, index) => {
        const x = padding + (index / (data.length - 1)) * chartWidth;
        const y = padding + chartHeight - ((point.value - minValue) / valueRange) * chartHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
    });
    

    ctx.fillStyle = '#6b7280';
    ctx.font = '12px Poppins';
    ctx.textAlign = 'left';
    ctx.fillText('Epoch 1', padding, canvas.height - 5);
    ctx.textAlign = 'center';
    ctx.fillText(label, canvas.width / 2, canvas.height - 5);
    ctx.textAlign = 'right';
    ctx.fillText(`Epoch ${data.length}`, canvas.width - padding, canvas.height - 5);
    

    ctx.textAlign = 'center';
    ctx.fillText(`Final: ${data[data.length - 1].value.toFixed(3)}`, canvas.width / 2, canvas.height - 20);
}


function generateRandomData() {
    // This function can be used to generate new random data
    // for demonstration purposes when integrating with actual CNN model
    const confidence = 85 + Math.random() * 15; // 85-100%
    mockData.assessment.confidence = Math.round(confidence * 10) / 10;
    
    // Update display
    document.getElementById('confidence').textContent = `${mockData.assessment.confidence}%`;
    
    // Redraw charts
    drawConfidenceChart();
}

// Export functions for potential external use
window.CancerNetReport = {
    showPage,
    nextPage,
    previousPage,
    generateRandomData,
    updateData: function(newData) {
        Object.assign(mockData, newData);
        loadPatientData();
        loadTables();
        loadAssessment();
        initializeCharts();
    }
};


function downloadPDF() {
    const element = document.getElementById('print-area');

    // Temporarily show both pages
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');
    const prevDisplay1 = page1.style.display;
    const prevDisplay2 = page2.style.display;

    page1.classList.remove('hidden');
    page2.classList.remove('hidden');

    const opt = {
      margin: [0, 0],
      filename: 'cancer-report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        scrollY: 0,
        useCORS: true
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      },
      pagebreak: {
        mode: ['avoid-all', 'css', 'legacy']
      }
    };

    html2pdf().set(opt).from(element).save().then(() => {
      // Restore display after download
      page1.style.display = prevDisplay1;
      page2.style.display = prevDisplay2;
    });
  }
/* // Global variables
let currentPage = 1;
let reportData = {}; // Will be filled from API

document.addEventListener('DOMContentLoaded', function () {
    // Fetch real data from API
    fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientId: 'PT-2024-001' }) // Customize as needed
    })
    .then(res => res.json())
    .then(data => {
        reportData = data;
        renderReport(data);
        lucide.createIcons(); // Load icons
        initializeCharts();
        updatePageState();
    })
    .catch(err => {
        console.error('Failed to fetch report:', err);
        alert('Error loading report. Please try again later.');
    });
});

// Page navigation
function showPage(pageNum) {
    currentPage = pageNum;
    document.getElementById('page1').classList.add('hidden');
    document.getElementById('page2').classList.add('hidden');
    document.getElementById(`page${pageNum}`).classList.remove('hidden');
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`page${pageNum}-btn`).classList.add('active');
    updatePageState();

    if (pageNum === 2) {
        setTimeout(() => initializePage2Charts(), 100);
    }
}

function nextPage() {
    if (currentPage < 2) showPage(currentPage + 1);
}
function previousPage() {
    if (currentPage > 1) showPage(currentPage - 1);
}
function updatePageState() {
    document.getElementById('current-page').textContent = currentPage;
    document.getElementById('prev-btn').disabled = currentPage === 1;
    document.getElementById('next-btn').disabled = currentPage === 2;
}

// Main renderer
function renderReport(data) {
    // Patient Info
    document.getElementById('patient-id').textContent = data.patient.id;
    document.getElementById('patient-name').textContent = data.patient.name;
    document.getElementById('patient-age').textContent = `${data.patient.age} years`;
    document.getElementById('patient-gender').textContent = data.patient.gender;
    document.getElementById('report-date').textContent = data.patient.reportDate;
    document.getElementById('ai-summary-text').textContent = data.aiSummary;

    // Parameters
    const paramTable = document.getElementById('parameters-table');
    paramTable.innerHTML = '';
    data.parameters.forEach(param => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="font-weight: 500;">${param.parameter}</td>
            <td>${param.value}</td>
            <td><span class="status-badge ${param.status}">${param.status}</span></td>`;
        paramTable.appendChild(row);
    });

    // Observations
    const obsTable = document.getElementById('observations-table');
    obsTable.innerHTML = '';
    data.observations.forEach(obs => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="font-weight: 500;">${obs.feature}</td>
            <td>${obs.finding}</td>
            <td><span class="significance-badge ${obs.significance.toLowerCase()}">${obs.significance}</span></td>`;
        obsTable.appendChild(row);
    });

    // Assessment
    document.getElementById('prediction').textContent = data.assessment.prediction;
    document.getElementById('risk-level').textContent = data.assessment.riskLevel;
    document.getElementById('confidence').textContent = `${data.assessment.confidence}%`;
    document.getElementById('recommendation').textContent = data.assessment.recommendation;
}

// Chart initialization
function initializeCharts() {
    drawConfidenceChart();
    drawPredictionChart();
}
function initializePage2Charts() {
    drawModalityChart();
    drawROCChart();
    drawConfusionMatrix();
    drawAccuracyChart();
    drawLossChart();
    drawClassAccuracyChart();
}

// Reuse your existing chart functions but change mockData → reportData
function drawConfidenceChart() {
    const canvas = document.getElementById('confidence-chart');
    const ctx = canvas.getContext('2d');
    const confidence = reportData.assessment.confidence;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 70;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 12;
    ctx.stroke();

    const endAngle = -Math.PI / 2 + (2 * Math.PI * confidence / 100);
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, -Math.PI / 2, endAngle);
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.stroke();

    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 24px Poppins';
    ctx.textAlign = 'center';
    ctx.fillText(`${confidence}%`, centerX, centerY + 8);
    ctx.font = '12px Poppins';
    ctx.fillStyle = '#6b7280';
    ctx.fillText('AI Confidence', centerX, centerY + 35);
}

function drawPredictionChart() {
    const canvas = document.getElementById('prediction-chart');
    const ctx = canvas.getContext('2d');
    const data = [
        { label: 'Malignant', value: reportData.assessment.confidence, color: '#ef4444' },
        { label: 'Benign', value: 100 - reportData.assessment.confidence, color: '#10b981' }
    ];
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 60;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let currentAngle = -Math.PI / 2;
    data.forEach(item => {
        const sliceAngle = (item.value / 100) * 2 * Math.PI;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = item.color;
        ctx.fill();
        currentAngle += sliceAngle;
    });

    // Legend
    let legendY = canvas.height - 60;
    data.forEach(item => {
        ctx.fillStyle = item.color;
        ctx.fillRect(centerX - 60, legendY, 12, 12);
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px Poppins';
        ctx.textAlign = 'left';
        ctx.fillText(`${item.label}: ${item.value.toFixed(1)}%`, centerX - 45, legendY + 10);
        legendY += 20;
    });
}

// Keep the rest of your chart functions: drawModalityChart, drawROCChart, etc.
// Just change any mockData. → reportData. if required in those

// Export to PDF
function downloadPDF() {
    const element = document.getElementById('print-area');
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');
    const prevDisplay1 = page1.style.display;
    const prevDisplay2 = page2.style.display;

    page1.classList.remove('hidden');
    page2.classList.remove('hidden');

    const opt = {
        margin: [0, 0],
        filename: 'cancer-report.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            scrollY: 0,
            useCORS: true
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait'
        },
        pagebreak: {
            mode: ['avoid-all', 'css', 'legacy']
        }
    };

    html2pdf().set(opt).from(element).save().then(() => {
        page1.style.display = prevDisplay1;
        page2.style.display = prevDisplay2;
    });
}

// Make navigation globally available
window.CancerNetReport = {
    showPage,
    nextPage,
    previousPage,
    downloadPDF
};
 */