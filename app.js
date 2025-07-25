const express = require('express');
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration
const CONFIG = {
    token: process.env.DISCORD_TOKEN || 'YOUR_BOT_TOKEN_HERE',
    channelId: process.env.CHANNEL_ID || 'YOUR_CHANNEL_ID_HERE',
    adminPassword: process.env.ADMIN_PASSWORD || 'admin123'
};

// Discord Client
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Discord Bot startup
client.once('ready', () => {
    console.log(`✅ Discord Bot is online as ${client.user.tag}`);
    console.log(`📢 Channel ID: ${CONFIG.channelId}`);
});

client.login(CONFIG.token).catch(err => {
    console.error('❌ Discord Login Error:', err.message);
});

// HTML Interface
const HTML_INTERFACE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Discord Update Publisher</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            padding: 40px;
            max-width: 800px;
            margin: 0 auto;
            animation: fadeIn 0.6s ease-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .header {
            text-align: center;
            margin-bottom: 40px;
        }

        .logo {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #5865F2, #3751FF);
            border-radius: 50%;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 30px;
            color: white;
        }

        h1 {
            color: #2c3e50;
            margin-bottom: 10px;
            font-size: 2.2em;
        }

        .subtitle {
            color: #7f8c8d;
            font-size: 1.1em;
        }

        .form-section {
            margin-bottom: 30px;
        }

        .form-group {
            margin-bottom: 20px;
        }

        label {
            display: block;
            margin-bottom: 8px;
            color: #2c3e50;
            font-weight: 600;
            font-size: 1.1em;
        }

        input, textarea {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid #e0e6ed;
            border-radius: 12px;
            font-size: 16px;
            font-family: inherit;
            transition: all 0.3s ease;
        }

        input:focus, textarea:focus {
            outline: none;
            border-color: #5865F2;
            box-shadow: 0 0 0 4px rgba(88, 101, 242, 0.1);
        }

        textarea {
            resize: vertical;
            min-height: 100px;
        }

        .category-section {
            background: #f8f9fa;
            border-radius: 15px;
            padding: 25px;
            margin-bottom: 25px;
            border: 2px solid #e9ecef;
        }

        .category-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .category-title {
            font-size: 1.3em;
            font-weight: 600;
            color: #2c3e50;
        }

        .remove-category {
            background: #dc3545;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.3s ease;
        }

        .remove-category:hover {
            background: #c82333;
            transform: translateY(-1px);
        }

        .items-container {
            margin-top: 15px;
        }

        .item-group {
            display: flex;
            gap: 10px;
            margin-bottom: 10px;
            align-items: center;
        }

        .item-input {
            flex: 1;
            margin-bottom: 0;
        }

        .remove-item {
            background: #6c757d;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 12px;
            min-width: 60px;
        }

        .remove-item:hover {
            background: #5a6268;
        }

        .add-item {
            background: #28a745;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            margin-top: 10px;
            transition: all 0.3s ease;
        }

        .add-item:hover {
            background: #218838;
            transform: translateY(-1px);
        }

        .add-category {
            background: #007bff;
            color: white;
            border: none;
            padding: 15px 25px;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            width: 100%;
            margin-bottom: 20px;
            transition: all 0.3s ease;
        }

        .add-category:hover {
            background: #0056b3;
            transform: translateY(-2px);
        }

        .button-group {
            display: flex;
            gap: 15px;
            margin-top: 30px;
        }

        .btn {
            flex: 1;
            padding: 15px 25px;
            border: none;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .btn-primary {
            background: linear-gradient(135deg, #5865F2, #3751FF);
            color: white;
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(88, 101, 242, 0.3);
        }

        .btn-secondary {
            background: #f8f9fa;
            color: #6c757d;
            border: 2px solid #e9ecef;
        }

        .btn-secondary:hover {
            background: #e9ecef;
            color: #495057;
        }

        .status {
            margin-top: 20px;
            padding: 15px;
            border-radius: 12px;
            text-align: center;
            font-weight: 600;
            opacity: 0;
            transition: all 0.3s ease;
        }

        .status.show {
            opacity: 1;
        }

        .status.success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }

        .status.error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }

        .status.info {
            background: #cce7ff;
            color: #004085;
            border: 1px solid #b8daff;
        }

        .preview-section {
            margin-top: 30px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 15px;
            border: 2px solid #e9ecef;
        }

        .preview-title {
            font-size: 1.2em;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 15px;
        }

        .preview-content {
            background: white;
            padding: 20px;
            border-radius: 10px;
            border-left: 4px solid #5865F2;
            font-family: 'Courier New', monospace;
            white-space: pre-wrap;
            max-height: 300px;
            overflow-y: auto;
        }

        @media (max-width: 768px) {
            .container {
                padding: 20px;
            }
            
            .button-group {
                flex-direction: column;
            }
            
            .item-group {
                flex-direction: column;
                align-items: stretch;
            }
            
            .remove-item {
                align-self: flex-end;
                max-width: 100px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🚀</div>
            <h1>Discord Update Publisher</h1>
            <p class="subtitle">Create structured updates with categories and bullet points</p>
        </div>

        <form id="updateForm">
            <div class="form-section">
                <div class="form-group">
                    <label for="updateTitle">Update Title:</label>
                    <input 
                        type="text" 
                        id="updateTitle" 
                        name="updateTitle" 
                        placeholder="e.g., Version 2.1.0 Release Notes"
                        required
                    >
                </div>

                <div class="form-group">
                    <label for="updateDescription">Description (Optional):</label>
                    <textarea 
                        id="updateDescription" 
                        name="updateDescription" 
                        placeholder="Brief overview of this update..."
                        rows="3"
                    ></textarea>
                </div>
            </div>

            <div id="categoriesContainer">
                <!-- Categories will be added dynamically -->
            </div>

            <button type="button" class="add-category" onclick="addCategory()">
                ➕ Add Category
            </button>

            <div class="preview-section">
                <div class="preview-title">📋 Preview:</div>
                <div class="preview-content" id="previewContent">
                    Add categories and items to see preview...
                </div>
            </div>

            <div class="button-group">
                <button type="submit" class="btn btn-primary">
                    🚀 Publish Update
                </button>
                <button type="button" class="btn btn-secondary" onclick="clearForm()">
                    🗑️ Clear All
                </button>
            </div>
        </form>

        <div id="status" class="status"></div>
    </div>

    <script>
        let categoryCount = 0;

        // Add initial category
        window.onload = function() {
            addCategory();
            updatePreview();
        };

        function addCategory() {
            categoryCount++;
            const container = document.getElementById('categoriesContainer');
            
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'category-section';
            categoryDiv.id = 'category-' + categoryCount;
            
            categoryDiv.innerHTML = \`
                <div class="category-header">
                    <div class="category-title">Category \${categoryCount}</div>
                    <button type="button" class="remove-category" onclick="removeCategory(\${categoryCount})">
                        🗑️ Remove
                    </button>
                </div>
                
                <div class="form-group">
                    <label>Category Title:</label>
                    <input 
                        type="text" 
                        name="categoryTitle-\${categoryCount}" 
                        placeholder="e.g., New Features, Bug Fixes, Improvements"
                        onchange="updatePreview()"
                        required
                    >
                </div>
                
                <div class="items-container" id="items-\${categoryCount}">
                    <div class="item-group">
                        <input 
                            type="text" 
                            class="item-input" 
                            name="item-\${categoryCount}-1" 
                            placeholder="Add bullet point..."
                            onchange="updatePreview()"
                        >
                        <button type="button" class="remove-item" onclick="removeItem(this)">Remove</button>
                    </div>
                </div>
                
                <button type="button" class="add-item" onclick="addItem(\${categoryCount})">
                    ➕ Add Item
                </button>
            \`;
            
            container.appendChild(categoryDiv);
            updatePreview();
        }

        function removeCategory(categoryId) {
            const categoryDiv = document.getElementById('category-' + categoryId);
            if (categoryDiv) {
                categoryDiv.remove();
                updatePreview();
            }
        }

        function addItem(categoryId) {
            const container = document.getElementById('items-' + categoryId);
            const itemCount = container.children.length + 1;
            
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item-group';
            itemDiv.innerHTML = \`
                <input 
                    type="text" 
                    class="item-input" 
                    name="item-\${categoryId}-\${itemCount}" 
                    placeholder="Add bullet point..."
                    onchange="updatePreview()"
                >
                <button type="button" class="remove-item" onclick="removeItem(this)">Remove</button>
            \`;
            
            container.appendChild(itemDiv);
        }

        function removeItem(button) {
            button.parentElement.remove();
            updatePreview();
        }

        function updatePreview() {
            const title = document.getElementById('updateTitle').value || 'Update Title';
            const description = document.getElementById('updateDescription').value;
            
            let preview = \`**\${title}**\\n\`;
            if (description) {
                preview += \`\${description}\\n\\n\`;
            }

            const categories = document.querySelectorAll('.category-section');
            categories.forEach(category => {
                const categoryTitle = category.querySelector('input[name^="categoryTitle"]').value;
                if (categoryTitle) {
                    preview += \`**\${categoryTitle}:**\\n\`;
                    
                    const items = category.querySelectorAll('.item-input');
                    items.forEach(item => {
                        if (item.value.trim()) {
                            preview += \`• \${item.value.trim()}\\n\`;
                        }
                    });
                    preview += '\\n';
                }
            });

            document.getElementById('previewContent').textContent = preview || 'Add categories and items to see preview...';
        }

        // Form submission
        document.getElementById('updateForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const title = document.getElementById('updateTitle').value.trim();
            const description = document.getElementById('updateDescription').value.trim();
            
            if (!title) {
                showStatus('Please enter an update title!', 'error');
                return;
            }

            // Collect categories
            const categories = [];
            const categoryElements = document.querySelectorAll('.category-section');
            
            categoryElements.forEach(categoryEl => {
                const categoryTitle = categoryEl.querySelector('input[name^="categoryTitle"]').value.trim();
                if (categoryTitle) {
                    const items = [];
                    const itemInputs = categoryEl.querySelectorAll('.item-input');
                    
                    itemInputs.forEach(input => {
                        if (input.value.trim()) {
                            items.push(input.value.trim());
                        }
                    });

                    if (items.length > 0) {
                        categories.push({
                            title: categoryTitle,
                            items: items
                        });
                    }
                }
            });

            if (categories.length === 0) {
                showStatus('Please add at least one category with items!', 'error');
                return;
            }

            try {
                showStatus('Publishing update...', 'info');
                
                const response = await fetch('/api/post-structured-update', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title: title,
                        description: description,
                        categories: categories
                    })
                });

                const result = await response.json();

                if (result.success) {
                    showStatus('✅ Update published successfully!', 'success');
                } else {
                    showStatus('❌ Error: ' + result.error, 'error');
                }
            } catch (error) {
                showStatus('❌ Connection error: ' + error.message, 'error');
            }
        });

        function showStatus(message, type) {
            const statusDiv = document.getElementById('status');
            statusDiv.textContent = message;
            statusDiv.className = 'status show ' + type;
            
            setTimeout(() => {
                statusDiv.classList.remove('show');
            }, 5000);
        }

        function clearForm() {
            document.getElementById('updateForm').reset();
            document.getElementById('categoriesContainer').innerHTML = '';
            categoryCount = 0;
            addCategory();
            updatePreview();
            document.getElementById('status').classList.remove('show');
        }

        // Add event listeners for live preview
        document.getElementById('updateTitle').addEventListener('input', updatePreview);
        document.getElementById('updateDescription').addEventListener('input', updatePreview);
    </script>
</body>
</html>`;

// Routes
app.get('/', (req, res) => {
    res.send(HTML_INTERFACE);
});

// API: Post structured update
app.post('/api/post-structured-update', async (req, res) => {
    try {
        const { title, description, categories } = req.body;

        if (!title || title.trim().length === 0) {
            return res.json({ success: false, error: 'Title cannot be empty' });
        }

        if (!categories || categories.length === 0) {
            return res.json({ success: false, error: 'At least one category is required' });
        }

        // Find Discord channel
        const channel = client.channels.cache.get(CONFIG.channelId);
        if (!channel) {
            return res.json({ success: false, error: 'Discord channel not found' });
        }

        // Create embed fields for categories
        const embedFields = [];
        categories.forEach(category => {
            if (category.items && category.items.length > 0) {
                const itemsText = category.items.map(item => `• ${item}`).join('\n');
                embedFields.push({
                    name: category.title,
                    value: itemsText,
                    inline: false
                });
            }
        });

        // Create beautiful embed message
        const embed = new EmbedBuilder()
            .setTitle(`🚀 ${title}`)
            .setColor(0x5865F2)
            .setTimestamp()
            .setFooter({ 
                text: 'Update Publisher',
                iconURL: 'https://cdn.discordapp.com/embed/avatars/0.png'
            });

        if (description) {
            embed.setDescription(description);
        }

        // Add category fields
        embedFields.forEach(field => {
            embed.addFields(field);
        });

        // Send message
        await channel.send({ embeds: [embed] });

        console.log(`✅ Structured update sent: ${title}`);
        res.json({ success: true, message: 'Update published successfully!' });

    } catch (error) {
        console.error('❌ Error sending update:', error);
        res.json({ success: false, error: 'Server error: ' + error.message });
    }
});

// Status API
app.get('/api/status', (req, res) => {
    res.json({
        botOnline: client.readyAt !== null,
        channelId: CONFIG.channelId,
        uptime: process.uptime()
    });
});

// Server startup
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Web interface running on port ${PORT}`);
    console.log(`🌐 Open: http://localhost:${PORT}`);
});

// Error handling
process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Promise rejection:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('❌ Unhandled exception:', error);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🔄 Server shutting down...');
    client.destroy();
    process.exit(0);
});
