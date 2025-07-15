// ==UserScript==
// @name         HyperTAP - Touchpoint Automation Platform (V1.0) by FY
// @namespace    http://tampermonkey.net/
// @version      16.2.10
// @description  Resizable dark-mode box with login, single-device session, 9-hour countdown timer, monthly subscription, logout confirmation, and automation features for CRM. Includes original HOME and AUTOFILL views, with fixed duplicate button issue.
// @match        https://crm.intl.hopeedu.com/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

/*
  User Credentials:
  - testuser: Password: testing123
  - firdaus: Password: administrator1993
  - bala: Password: Wq@8tY#3mK$9vN2
  - user04: Password: Xr$2nP#6vM@9kQw
  - user05: Password: Lp#7mT$4xN!2vQw
  - user06: Password: Yt@3kM$8vN#2xQw
  - user07: Password: Qw#9xP$2mT!4vNk
  - user08: Password: Nm$4vT#7xP@2kQw
  - user09: Password: Vk#2mP$9xT!4qNw
  - user10: Password: Tj@7xM$3vP#2kQw
  - user11: Password: Xp#4vN$8mT!2qKw
  - user12: Password: Zm@9kP$2xT#7vQw
  - user13: Password: Wq#3mT$9vP@2kNx
  - user14: Password: Yt$7xN#2mP@4vQw
  - user15: Password: Qw@2kP$8vT#9mNx
  - user16: Password: Nm#9xT$4vP@2kQw
  - user17: Password: Vk$3mP#7xT@9qNw
  - user18: Password: Tj@8vN$2mP#4kQw
  - user19: Password: Xp$4kT$9vN@2mQw
  - user20: Password: Zm#2xP$7vT@9kNw
  - user21: Password: Wq@9mT$3vP#2kQx
  - user22: Password: Yt$7xN#4mP@2vQw
  - user23: Password: Qw#2kP$8vT@9mNx
  - user24: Password: Nm@9xT$3vP#2kQw
  - user25: Password: Vk$4mP#7xT@2qNw
  - user26: Password: Tj#8vN$2mP@4kQw
  - user27: Password: Xp@2kT$9vN#4mQw
  - user28: Password: Zm$7xP#3vT@9kNw
  - user29: Password: Wq#9mT$2vP@4kQx
  - user30: Password: Yt$3xN#8vP@2mQw
*/

(async function() {
    'use strict';

    // Configuration
    const users = {
        'testuser': { password: 'testing123', subscriptionEnd: '2025-07-31' },
        'firdaus': { password: 'administrator1993', subscriptionEnd: '2025-07-31' },
        'bala': { password: 'Wq@8tY#3mK$9vN2', subscriptionEnd: '2025-07-31' },
        'user04': { password: 'Xr$2nP#6vM@9kQw', subscriptionEnd: '2025-07-31' },
        'user05': { password: 'Lp#7mT$4xN!2vQw', subscriptionEnd: '2025-07-31' },
        'user06': { password: 'Yt@3kM$8vN#2xQw', subscriptionEnd: '2025-07-31' },
        'user07': { password: 'Qw#9xP$2mT!4vNk', subscriptionEnd: '2025-07-31' },
        'user08': { password: 'Nm$4vT#7xP@2kQw', subscriptionEnd: '2025-07-31' },
        'user09': { password: 'Vk#2mP$9xT!4qNw', subscriptionEnd: '2025-07-31' },
        'user10': { password: 'Tj@7xM$3vP#2kQw', subscriptionEnd: '2025-07-31' },
        'user11': { password: 'Xp#4vN$8mT!2qKw', subscriptionEnd: '2025-07-31' },
        'user12': { password: 'Zm@9kP$2xT#7vQw', subscriptionEnd: '2025-07-31' },
        'user13': { password: 'Wq#3mT$9vP@2kNx', subscriptionEnd: '2025-07-31' },
        'user14': { password: 'Yt$7xN#2mP@4vQw', subscriptionEnd: '2025-07-31' },
        'user15': { password: 'Qw@2kP$8vT#9mNx', subscriptionEnd: '2025-07-31' },
        'user16': { password: 'Nm#9xT$4vP@2kQw', subscriptionEnd: '2025-07-31' },
        'user17': { password: 'Vk$3mP#7xT@9qNw', subscriptionEnd: '2025-07-31' },
        'user18': { password: 'Tj@8vN$2mP#4kQw', subscriptionEnd: '2025-07-31' },
        'user19': { password: 'Xp$4kT$9vN@2mQw', subscriptionEnd: '2025-07-31' },
        'user20': { password: 'Zm#2xP$7vT@9kNw', subscriptionEnd: '2025-07-31' },
        'user21': { password: 'Wq@9mT$3vP#2kQx', subscriptionEnd: '2025-07-31' },
        'user22': { password: 'Yt$7xN#4mP@2vQw', subscriptionEnd: '2025-07-31' },
        'user23': { password: 'Qw#2kP$8vT@9mNx', subscriptionEnd: '2025-07-31' },
        'user24': { password: 'Nm@9xT$3vP#2kQw', subscriptionEnd: '2025-07-31' },
        'user25': { password: 'Vk$4mP#7xT@2qNw', subscriptionEnd: '2025-07-31' },
        'user26': { password: 'Tj#8vN$2mP@4kQw', subscriptionEnd: '2025-07-31' },
        'user27': { password: 'Xp@2kT$9vN#4mQw', subscriptionEnd: '2025-07-31' },
        'user28': { password: 'Zm$7xP#3vT@9kNw', subscriptionEnd: '2025-07-31' },
        'user29': { password: 'Wq#9mT$2vP@4kQx', subscriptionEnd: '2025-07-31' },
        'user30': { password: 'Yt$3xN#8vP@2mQw', subscriptionEnd: '2025-07-31' }
    };

    // Session state
    let sessionToken = localStorage.getItem('hypertap_token');
    let username = localStorage.getItem('hypertap_username');
    let subscriptionEnd = localStorage.getItem('hypertap_subscription_end');
    let sessionStart = localStorage.getItem('hypertap_session_start');
    let deviceId = localStorage.getItem('hypertap_device_id');
    let isAuthenticated = false;
    let lastFocusedElement = null;
    let currentView = 'home';
    let countdownInterval = null;

    // Server API endpoint
    const API_URL = 'http://localhost:3000/api';

    // Generate or retrieve device ID
    function getDeviceId() {
        if (!deviceId) {
            deviceId = crypto.getRandomValues(new Uint32Array(4)).join('-');
            localStorage.setItem('hypertap_device_id', deviceId);
        }
        return deviceId;
    }

    // Generate session token
    function generateSessionToken(username, timestamp) {
        const deviceId = getDeviceId();
        return `${username}:${timestamp}:${deviceId}`;
    }

    // Check session validity
    async function checkSession() {
        if (sessionToken && sessionStart && username && subscriptionEnd && deviceId) {
            const expectedToken = generateSessionToken(username, sessionStart);
            if (sessionToken !== expectedToken) {
                await clearSession();
                return false;
            }
            const startTime = new Date(parseInt(sessionStart));
            const now = new Date();
            const hoursElapsed = (now - startTime) / (1000 * 60 * 60);
            const subEnd = new Date(subscriptionEnd);
            const currentMonth = now.getMonth() + 1;
            const currentYear = now.getFullYear();
            if (hoursElapsed < 9 &&
                subEnd >= now &&
                subEnd.getMonth() + 1 === currentMonth &&
                subEnd.getFullYear() === currentYear) {
                // Verify session with server
                try {
                    const response = await new Promise((resolve, reject) => {
                        GM_xmlhttpRequest({
                            method: 'POST',
                            url: `${API_URL}/login`,
                            headers: { 'Content-Type': 'application/json' },
                            data: JSON.stringify({ username, deviceId }),
                            onload: (res) => resolve(JSON.parse(res.responseText)),
                            onerror: (err) => reject(err)
                        });
                    });
                    if (response.ok) {
                        isAuthenticated = true;
                        return true;
                    } else {
                        await clearSession();
                        return false;
                    }
                } catch (e) {
                    console.error('Session check failed:', e);
                    await clearSession();
                    return false;
                }
            }
        }
        await clearSession();
        return false;
    }

    // Clear session data
    async function clearSession() {
        if (username && deviceId) {
            try {
                await new Promise((resolve, reject) => {
                    GM_xmlhttpRequest({
                        method: 'POST',
                        url: `${API_URL}/logout`, // Assuming a new logout endpoint
                        headers: { 'Content-Type': 'application/json' },
                        data: JSON.stringify({ username, deviceId }),
                        onload: () => resolve(),
                        onerror: (err) => reject(err)
                    });
                });
            } catch (e) {
                console.error('Failed to clear session on server:', e);
            }
        }
        localStorage.removeItem('hypertap_token');
        localStorage.removeItem('hypertap_username');
        localStorage.removeItem('hypertap_session_start');
        localStorage.removeItem('hypertap_subscription_end');
        localStorage.removeItem('hypertap_device_id');
        isAuthenticated = false;
        if (countdownInterval) {
            clearInterval(countdownInterval);
            countdownInterval = null;
        }
    }

    // Cleanup existing panels
    function cleanupExistingPanels() {
        const existingBoxes = document.querySelectorAll('div[style*="position: fixed"][style*="background-color: #4B4B4B"]');
        existingBoxes.forEach(box => box.remove());
        const existingMinimizedBoxes = document.querySelectorAll('div[style*="position: fixed"][style*="background-color: #444"][style*="bottom: 10px"]');
        existingMinimizedBoxes.forEach(box => box.remove());
    }

    // Create main HyperTAP panel
    cleanupExistingPanels();
    const box = document.createElement('div');
    box.style.position = 'fixed';
    box.style.width = '460px';
    box.style.height = '700px';
    box.style.left = '20px';
    box.style.top = '80px';
    box.style.backgroundColor = '#4B4B4B';
    box.style.border = '2px solid #000';
    box.style.zIndex = '9999';
    box.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    box.style.overflow = 'hidden';
    box.style.display = 'flex';
    box.style.flexDirection = 'column';
    box.style.resize = 'both';
    box.style.minWidth = '300px';
    box.style.minHeight = '300px';
    box.style.color = '#fff';
    box.style.userSelect = 'none';
    document.body.appendChild(box);

    // Drag area
    const dragArea = document.createElement('div');
    dragArea.style.width = '100%';
    dragArea.style.height = '30px';
    dragArea.style.backgroundColor = '#444';
    dragArea.style.cursor = 'move';
    dragArea.style.display = 'flex';
    dragArea.style.alignItems = 'center';
    dragArea.style.justifyContent = 'center';
    dragArea.textContent = 'HyperTAP V1.0 BY FY';
    dragArea.style.fontWeight = 'bold';
    dragArea.style.fontSize = '14px';
    box.appendChild(dragArea);

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    dragArea.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - box.getBoundingClientRect().left;
        offsetY = e.clientY - box.getBoundingClientRect().top;
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const newLeft = Math.max(0, Math.min(e.clientX - offsetX, window.innerWidth - box.offsetWidth));
            const newTop = Math.max(0, Math.min(e.clientY - offsetY, window.innerHeight - box.offsetHeight));
            box.style.left = `${newLeft}px`;
            box.style.top = `${newTop}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Minimize button
    const minimizeButton = document.createElement('button');
    minimizeButton.textContent = '-';
    minimizeButton.style.position = 'absolute';
    minimizeButton.style.top = '5px';
    minimizeButton.style.right = '5px';
    minimizeButton.style.cursor = 'pointer';
    minimizeButton.style.backgroundColor = 'red';
    minimizeButton.style.color = '#fff';
    minimizeButton.style.border = 'none';
    minimizeButton.style.width = '20px';
    minimizeButton.style.height = '20px';
    minimizeButton.style.fontSize = '14px';
    minimizeButton.style.fontWeight = 'bold';
    box.appendChild(minimizeButton);

    const minimizedBox = document.createElement('div');
    minimizedBox.style.position = 'fixed';
    minimizedBox.style.bottom = '10px';
    minimizedBox.style.left = '10px';
    minimizedBox.style.width = '200px';
    minimizedBox.style.height = '30px';
    minimizedBox.style.backgroundColor = '#444';
    minimizedBox.style.color = '#fff';
    minimizedBox.style.display = 'none';
    minimizedBox.style.justifyContent = 'center';
    minimizedBox.style.alignItems = 'center';
    minimizedBox.style.cursor = 'pointer';
    minimizedBox.style.fontWeight = 'bold';
    minimizedBox.style.zIndex = '10000';
    minimizedBox.textContent = 'HyperTAP V1.0 BY FY';
    minimizedBox.style.textAlign = 'center';
    document.body.appendChild(minimizedBox);

    function addClickEffect(elem) {
        elem.style.transition = 'background-color 0.2s';
        const origColor = elem.style.backgroundColor;
        elem.style.backgroundColor = '#777';
        setTimeout(() => {
            elem.style.backgroundColor = origColor;
        }, 200);
    }

    minimizeButton.addEventListener('click', () => {
        if (box.style.display === 'none') {
            box.style.display = 'flex';
            minimizedBox.style.display = 'none';
        } else {
            box.style.display = 'none';
            minimizedBox.style.display = 'flex';
        }
        addClickEffect(minimizeButton);
    });

    minimizedBox.addEventListener('click', () => {
        minimizedBox.style.display = 'none';
        box.style.display = 'flex';
        addClickEffect(minimizedBox);
    });

    // Layout container
    const layout = document.createElement('div');
    layout.style.flex = '1';
    layout.style.overflowY = 'auto';
    layout.style.padding = '5px';
    box.appendChild(layout);

    // Login panel
    function renderLoginPanel() {
        layout.innerHTML = '';
        const loginContainer = document.createElement('div');
        loginContainer.style.padding = '20px';
        loginContainer.style.display = 'flex';
        loginContainer.style.flexDirection = 'column';
        loginContainer.style.alignItems = 'center';
        loginContainer.style.gap = '10px';

        const title = document.createElement('div');
        title.textContent = 'HyperTAP Login';
        title.style.fontWeight = 'bold';
        title.style.fontSize = '16px';
        loginContainer.appendChild(title);

        const usernameInput = document.createElement('input');
        usernameInput.type = 'text';
        usernameInput.placeholder = 'Username';
        usernameInput.style.width = '100%';
        usernameInput.style.padding = '8px';
        usernameInput.style.backgroundColor = '#444';
        usernameInput.style.color = '#fff';
        usernameInput.style.border = '1px solid #777';
        usernameInput.style.borderRadius = '3px';
        loginContainer.appendChild(usernameInput);

        const passwordInput = document.createElement('input');
        passwordInput.type = 'password';
        passwordInput.placeholder = 'Password';
        passwordInput.style.width = '100%';
        passwordInput.style.padding = '8px';
        passwordInput.style.backgroundColor = '#444';
        passwordInput.style.color = '#fff';
        passwordInput.style.border = '1px solid #777';
        passwordInput.style.borderRadius = '3px';
        loginContainer.appendChild(passwordInput);

        const loginButton = document.createElement('button');
        loginButton.textContent = 'Login';
        loginButton.style.width = '100%';
        loginButton.style.padding = '10px';
        loginButton.style.backgroundColor = '#555';
        loginButton.style.color = '#fff';
        loginButton.style.cursor = 'pointer';
        loginButton.style.borderRadius = '3px';
        loginButton.style.border = 'none';
        loginContainer.appendChild(loginButton);

        const errorMessage = document.createElement('div');
        errorMessage.style.color = 'red';
        errorMessage.style.fontSize = '12px';
        errorMessage.style.display = 'none';
        loginContainer.appendChild(errorMessage);

        loginButton.addEventListener('click', async () => {
            const inputUsername = usernameInput.value.trim();
            const password = passwordInput.value.trim();
            if (!inputUsername || !password) {
                errorMessage.textContent = 'Please enter username and password';
                errorMessage.style.display = 'block';
                return;
            }

            const user = users[inputUsername];
            if (!user) {
                errorMessage.textContent = 'Invalid username';
                errorMessage.style.display = 'block';
                return;
            }

            if (password !== user.password) {
                errorMessage.textContent = 'Invalid password';
                errorMessage.style.display = 'block';
                return;
            }

            const subEnd = new Date(user.subscriptionEnd);
            const now = new Date();
            const currentMonth = now.getMonth() + 1;
            const currentYear = now.getFullYear();
            if (subEnd < now || subEnd.getMonth() + 1 !== currentMonth || subEnd.getFullYear() !== currentYear) {
                errorMessage.textContent = 'Subscription expired';
                errorMessage.style.display = 'block';
                return;
            }

            // Check with server for existing session
            try {
                const response = await new Promise((resolve, reject) => {
                    GM_xmlhttpRequest({
                        method: 'POST',
                        url: `${API_URL}/login`,
                        headers: { 'Content-Type': 'application/json' },
                        data: JSON.stringify({ username: inputUsername, deviceId: getDeviceId() }),
                        onload: (res) => resolve(JSON.parse(res.responseText)),
                        onerror: (err) => reject(err)
                    });
                });

                if (!response.ok) {
                    errorMessage.textContent = response.error || 'Login failed: User already logged in on another device';
                    errorMessage.style.display = 'block';
                    return;
                }

                const timestamp = Date.now();
                sessionToken = generateSessionToken(inputUsername, timestamp);
                username = inputUsername;
                subscriptionEnd = user.subscriptionEnd;
                sessionStart = timestamp;
                localStorage.setItem('hypertap_token', sessionToken);
                localStorage.setItem('hypertap_username', username);
                localStorage.setItem('hypertap_subscription_end', subscriptionEnd);
                localStorage.setItem('hypertap_session_start', timestamp);
                localStorage.setItem('hypertap_device_id', getDeviceId());
                isAuthenticated = true;
                currentView = 'home';
                renderMainUI();
                addClickEffect(loginButton);
            } catch (e) {
                errorMessage.textContent = 'Login failed: Server error';
                errorMessage.style.display = 'block';
                console.error('Login error:', e);
            }
        });

        layout.appendChild(loginContainer);
    }

    // Render main UI
    function renderMainUI() {
        layout.innerHTML = '';
        const existingButtonContainer = box.querySelector('div[style*="display: flex"][style*="background-color: #444"]');
        if (existingButtonContainer) {
            existingButtonContainer.remove();
        }

        document.addEventListener('focusin', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                lastFocusedElement = e.target;
            }
        });

        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.width = '100%';
        buttonContainer.style.backgroundColor = '#444';

        const homeButton = createNavButton('HOME', () => {
            if (!isAuthenticated) {
                renderLoginPanel();
                return;
            }
            currentView = 'home';
            renderView();
        });
        const autofillButton = createNavButton('AUTOFILL', () => {
            if (!isAuthenticated) {
                renderLoginPanel();
                return;
            }
            currentView = 'autofill';
            renderView();
        });
        const infoButton = createNavButton('INFO', () => {
            if (!isAuthenticated) {
                renderLoginPanel();
                return;
            }
            currentView = 'info';
            renderView();
        });
        const logoutButton = createNavButton('LOGOUT', async () => {
            if (confirm('Are you sure you want to logout?')) {
                await clearSession();
                currentView = 'login';
                renderLoginPanel();
            }
        });

        buttonContainer.appendChild(homeButton);
        buttonContainer.appendChild(autofillButton);
        buttonContainer.appendChild(infoButton);
        buttonContainer.appendChild(logoutButton);

        Array.from(buttonContainer.children).forEach(btn => {
            btn.style.borderRight = '1px solid #666';
        });
        buttonContainer.lastChild.style.borderRight = 'none';

        box.appendChild(buttonContainer);

        function createNavButton(label, onClick) {
            const button = document.createElement('button');
            button.textContent = label;
            button.style.flex = '1';
            button.style.padding = '10px';
            button.style.backgroundColor = '#555';
            button.style.color = '#fff';
            button.style.cursor = 'pointer';
            button.style.textAlign = 'center';
            button.style.border = 'none';
            button.style.fontSize = '14px';
            button.style.fontWeight = 'bold';
            button.addEventListener('click', () => {
                onClick();
                addClickEffect(button);
            });
            return button;
        }

        function insertText(txt) {
            if (lastFocusedElement && (lastFocusedElement.tagName === 'INPUT' || lastFocusedElement.tagName === 'TEXTAREA')) {
                const start = lastFocusedElement.selectionStart;
                const end = lastFocusedElement.selectionEnd;
                const val = lastFocusedElement.value;
                lastFocusedElement.value = val.slice(0, start) + txt + val.slice(end);
                lastFocusedElement.setSelectionRange(start + txt.length, start + txt.length);
                lastFocusedElement.focus();

                const inputEvent = new Event('input', { bubbles: true });
                lastFocusedElement.dispatchEvent(inputEvent);
                const changeEvent = new Event('change', { bubbles: true });
                lastFocusedElement.dispatchEvent(changeEvent);
            }
        }

        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        const getTodayGMT8 = () => {
            const now = new Date();
            const utc = now.getTime() + now.getTimezoneOffset() * 60000;
            const gmt8 = new Date(utc + 8 * 3600000);
            return gmt8.toISOString().split('T')[0];
        };

        const getDueDate = () => {
            const storedDate = localStorage.getItem('crm_due_date');
            if (storedDate && /^\d{4}-\d{2}-\d{2}$/.test(storedDate)) {
                return storedDate;
            }
            return getTodayGMT8();
        };

        const fillInputByLabel = async (labelText, value) => {
            try {
                const label = [...document.querySelectorAll('label')].find(el => el.textContent.trim().includes(labelText));
                if (!label) {
                    console.warn(`Label not found: ${labelText}`);
                    return;
                }
                const input = label.closest('.el-form-item')?.querySelector('input');
                if (!input) {
                    console.warn(`Input not found for label: ${labelText}`);
                    return;
                }
                for (let i = 0; i < 2; i++) {
                    input.click();
                    await sleep(70);
                    input.focus();
                    input.value = value;
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                    input.dispatchEvent(new Event('change', { bubbles: true }));
                    await sleep(49);
                    input.blur();
                    await sleep(49);
                }
            } catch (e) {
                console.error(`Error in fillInputByLabel for ${labelText}:`, e);
            }
        };

        const fillTextareaByLabel = (labelText, value) => {
            try {
                const label = [...document.querySelectorAll('label')].find(el => el.textContent.trim().includes(labelText));
                if (!label) {
                    console.warn(`Label not found: ${labelText}`);
                    return;
                }
                const textarea = label.closest('.el-form-item')?.querySelector('textarea');
                if (textarea) {
                    textarea.value = value;
                    textarea.dispatchEvent(new Event('input', { bubbles: true }));
                } else {
                    console.warn(`Textarea not found for label: ${labelText}`);
                }
            } catch (e) {
                console.error(`Error in fillTextareaByLabel for ${labelText}:`, e);
            }
        };

        const selectDropdownByLabel = async (labelText, optionText) => {
            try {
                const label = [...document.querySelectorAll('label')].find(el => el.textContent.trim() === labelText);
                if (!label) {
                    console.warn(`Label not found: ${labelText}`);
                    return;
                }
                const elSelect = label.closest('.el-form-item')?.querySelector('.el-select');
                if (!elSelect) {
                    console.warn(`Select element not found for label: ${labelText}`);
                    return;
                }
                elSelect.click();
                await sleep(70);
                let retries = 5;
                let selectedOption = null;
                while (retries-- > 0 && !selectedOption) {
                    const dropdown = [...document.querySelectorAll('.el-select-dropdown')].find(el => el.offsetParent !== null);
                    if (!dropdown) {
                        console.warn(`Dropdown not visible for ${labelText}`);
                        await sleep(49);
                        continue;
                    }
                    const options = dropdown.querySelectorAll('.el-select-dropdown__item');
                    selectedOption = [...options].find(opt => opt.textContent.trim().toLowerCase() === optionText.toLowerCase());
                    if (!selectedOption) await sleep(49);
                }
                if (selectedOption) {
                    selectedOption.scrollIntoView({ block: 'center' });
                    await sleep(39);
                    selectedOption.click();
                    await sleep(39);
                    const input = elSelect.querySelector('input');
                    if (input) {
                        input.blur();
                        await sleep(39);
                    }
                    document.body.click();
                    await sleep(39);
                } else {
                    console.warn(`Option "${optionText}" not found for ${labelText}`);
                }
            } catch (e) {
                console.error(`Error in selectDropdownByLabel for ${labelText}:`, e);
            }
        };

        const runFFFC1 = async () => {
            const dueDate = getDueDate();
            await fillInputByLabel("Subject", "Follow Up Call");
            await fillInputByLabel("Due Date", dueDate);
            fillTextareaByLabel("Comments", "Fully funded scholarship");
            await selectDropdownByLabel("Type", "Contact");
            await selectDropdownByLabel("Sub Type", "Outbound Call");
            await selectDropdownByLabel("Appointment Source", "Phone");
            await selectDropdownByLabel("Status", "Completed-Not Interested");
        };

        const runFirstTouchFFFC = async () => {
            const dueDate = getDueDate();
            await fillInputByLabel("Subject", "First Touch Call");
            await fillInputByLabel("Due Date", dueDate);
            fillTextareaByLabel("Comments", "Fully funded scholarship");
            await selectDropdownByLabel("Type", "Contact");
            await selectDropdownByLabel("Sub Type", "Outbound Call");
            await selectDropdownByLabel("Appointment Source", "Phone");
            await selectDropdownByLabel("Status", "Completed-Not Interested");
        };

        const runFFFC2 = async () => {
            fillTextareaByLabel("Remarks", "FF");
            await selectDropdownByLabel("Lead Status", "Lost");
            await selectDropdownByLabel("KIV/Cold/Invalid/Lost Reason", "Do Not Want INTI (Due to Reputation / Brand)");
        };

        const runNoAnswer1 = async () => {
            const dueDate = getDueDate();
            await fillInputByLabel("Subject", "Follow Up Call");
            await fillInputByLabel("Due Date", dueDate);
            fillTextareaByLabel("Comments", "No Answer");
            await selectDropdownByLabel("Type", "Contact");
            await selectDropdownByLabel("Sub Type", "Outbound Call");
            await selectDropdownByLabel("Appointment Source", "Phone");
            await selectDropdownByLabel("Status", "Completed-No Reply");
        };

        const runNoAnswer2 = async () => {
            fillTextareaByLabel("Remarks", "No Reply");
            await selectDropdownByLabel("Lead Status", "Lost");
            await selectDropdownByLabel("KIV/Cold/Invalid/Lost Reason", "Do Not Want INTI (Due to Reputation / Brand)");
        };

        const runSet1 = async (comment) => {
            const dueDate = getDueDate();
            await selectDropdownByLabel("Type", "Contact");
            await selectDropdownByLabel("Sub Type", "Outbound Call");
            await fillInputByLabel("Subject", "Follow Up Call");
            await fillInputByLabel("Due Date", dueDate);
            await selectDropdownByLabel("Appointment Source", "Phone");
            fillTextareaByLabel("Comments", comment);
            await selectDropdownByLabel("Status", "Completed-Not Interested");
        };

        const runFirstTouchSet1 = async (comment) => {
            const dueDate = getDueDate();
            await selectDropdownByLabel("Type", "Contact");
            await selectDropdownByLabel("Sub Type", "Outbound Call");
            await fillInputByLabel("Subject", "First Touch Call");
            await fillInputByLabel("Due Date", dueDate);
            await selectDropdownByLabel("Appointment Source", "Phone");
            fillTextareaByLabel("Comments", comment);
            await selectDropdownByLabel("Status", "Completed-Not Interested");
        };

        const runFirstTouchNoRinging = async () => {
            const dueDate = getDueDate();
            await selectDropdownByLabel("Type", "Contact");
            await selectDropdownByLabel("Sub Type", "Outbound Call");
            await fillInputByLabel("Subject", "First Touch Call");
            await fillInputByLabel("Due Date", dueDate);
            await selectDropdownByLabel("Appointment Source", "Phone");
            fillTextareaByLabel("Comments", "No ringing");
            await selectDropdownByLabel("Status", "Completed-No Reply");
        };

        const runFirstTouchSwitchedOff = async () => {
            const dueDate = getDueDate();
            await selectDropdownByLabel("Type", "Contact");
            await selectDropdownByLabel("Sub Type", "Outbound Call");
            await fillInputByLabel("Subject", "First Touch Call");
            await fillInputByLabel("Due Date", dueDate);
            await selectDropdownByLabel("Appointment Source", "Phone");
            fillTextareaByLabel("Comments", "Switched Off / Power Off");
            await selectDropdownByLabel("Status", "Completed-No Reply");
        };

        const runFirstTouchXRequirement = async () => {
            const dueDate = getDueDate();
            await selectDropdownByLabel("Type", "Contact");
            await selectDropdownByLabel("Sub Type", "Outbound Call");
            await fillInputByLabel("Subject", "First Touch Call");
            await fillInputByLabel("Due Date", dueDate);
            await selectDropdownByLabel("Appointment Source", "Phone");
            fillTextareaByLabel("Comments", "Not Meeting Entry Requirement");
            await selectDropdownByLabel("Status", "Completed-Not Interested");
        };

        const runSet2 = async (remarksText) => {
            fillTextareaByLabel("Remarks", remarksText);
            await selectDropdownByLabel("Lead Status", "Lost");
            await selectDropdownByLabel("KIV/Cold/Invalid/Lost Reason", "Do Not Want INTI (Due to Reputation / Brand)");
        };

        const runFirstTouchCall = async () => {
            const dueDate = getDueDate();
            await selectDropdownByLabel("Type", "Contact");
            await selectDropdownByLabel("Sub Type", "Outbound Call");
            await fillInputByLabel("Subject", "First Touch Call");
            await fillInputByLabel("Due Date", dueDate);
            await selectDropdownByLabel("Appointment Source", "Phone");
            fillTextareaByLabel("Comments", "No answer");
            await selectDropdownByLabel("Status", "Completed-No Reply");
        };

        const runFirstTouchWhatsApp = async () => {
            const dueDate = getDueDate();
            await selectDropdownByLabel("Type", "Contact");
            await selectDropdownByLabel("Sub Type", "Mobile Chat");
            await fillInputByLabel("Subject", "First Touch WhatsApp");
            await fillInputByLabel("Due Date", dueDate);
            await selectDropdownByLabel("Appointment Source", "Mobile Chat");
            fillTextareaByLabel("Comments", "WhatsApp sent");
            await selectDropdownByLabel("Status", "Completed-No Reply");
        };

        const runFUCall = async () => {
            await selectDropdownByLabel("Type", "Contact");
            await selectDropdownByLabel("Sub Type", "Outbound Call");
            await fillInputByLabel("Subject", "Follow Up Call");
            await fillInputByLabel("Due Date", "");
            await selectDropdownByLabel("Appointment Source", "Phone");
            await selectDropdownByLabel("Status", "Not Started");
        };

        const runFUWhatsApp = async () => {
            await selectDropdownByLabel("Type", "Contact");
            await selectDropdownByLabel("Sub Type", "Mobile Chat");
            await fillInputByLabel("Subject", "Follow Up WhatsApp");
            await fillInputByLabel("Due Date", "");
            await selectDropdownByLabel("Appointment Source", "Mobile Chat");
            await selectDropdownByLabel("Status", "Not Started");
        };

        const runInvalid2 = async () => {
            fillTextareaByLabel("Remarks", "Invalid");
            await selectDropdownByLabel("Lead Status", "Invalid");
            await selectDropdownByLabel("KIV/Cold/Invalid/Lost Reason", "Do Not Want INTI (Due to Reputation / Brand)");
        };

        function renderView() {
            if (!isAuthenticated) {
                renderLoginPanel();
                return;
            }
            layout.innerHTML = '';
            box.style.height = '700px';
            layout.style.overflowY = 'auto';

            if (currentView === 'home') {
                renderHomeView();
            } else if (currentView === 'autofill') {
                renderAutofillView();
            } else if (currentView === 'info') {
                renderInfoView();
            } else {
                renderLoginPanel();
            }
        }

        function renderInfoView() {
            if (!isAuthenticated) {
                renderLoginPanel();
                return;
            }
            const infoContainer = document.createElement('div');
            infoContainer.style.padding = '20px';
            infoContainer.style.textAlign = 'center';

            const usernameLabel = document.createElement('div');
            usernameLabel.textContent = `Username: ${username}`;
            usernameLabel.style.marginBottom = '10px';
            infoContainer.appendChild(usernameLabel);

            const sessionTimeLeft = document.createElement('div');
            sessionTimeLeft.style.marginBottom = '10px';
            infoContainer.appendChild(sessionTimeLeft);

            const subscriptionLabel = document.createElement('div');
            subscriptionLabel.textContent = `Subscription Expiry: ${new Date(subscriptionEnd).toLocaleDateString()}`;
            infoContainer.appendChild(subscriptionLabel);

            layout.appendChild(infoContainer);

            if (countdownInterval) {
                clearInterval(countdownInterval);
            }
            updateCountdown();
            countdownInterval = setInterval(updateCountdown, 1000);

            function updateCountdown() {
                const startTime = new Date(parseInt(sessionStart));
                const now = new Date();
                const msLeft = startTime.getTime() + (9 * 60 * 60 * 1000) - now.getTime();
                if (msLeft <= 0) {
                    clearInterval(countdownInterval);
                    countdownInterval = null;
                    clearSession();
                    currentView = 'login';
                    renderLoginPanel();
                    return;
                }
                const hours = Math.floor(msLeft / (1000 * 60 * 60));
                const minutes = Math.floor((msLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((msLeft % (1000 * 60)) / 1000);
                sessionTimeLeft.textContent = `Session Time Left: ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            }
        }

        function renderHomeView() {
            if (!isAuthenticated) {
                renderLoginPanel();
                return;
            }
            const topDateSection = document.createElement('div');
            topDateSection.style.marginBottom = '10px';

            const topDateTitle = document.createElement('div');
            topDateTitle.textContent = "Today's Date";
            topDateTitle.style.fontWeight = 'bold';
            topDateTitle.style.fontSize = '14px';
            topDateTitle.style.marginBottom = '5px';
            topDateTitle.style.color = '#fff';
            topDateTitle.style.textAlign = 'center';
            topDateSection.appendChild(topDateTitle);

            const topDateBtn = document.createElement('button');
            topDateBtn.textContent = "Date";
            topDateBtn.style.width = '100%';
            topDateBtn.style.padding = '10px';
            topDateBtn.style.backgroundColor = '#555';
            topDateBtn.style.color = '#fff';
            topDateBtn.style.cursor = 'pointer';
            topDateBtn.style.borderRadius = '3px';
            topDateBtn.style.fontSize = '12px';
            topDateBtn.style.border = 'none';
            topDateBtn.addEventListener('click', () => {
                const now = new Date();
                const yyyy = now.getFullYear();
                const mm = String(now.getMonth() + 1).padStart(2, '0');
                const dd = String(now.getDate()).padStart(2, '0');
                const yyyymmdd = `${yyyy}-${mm}-${dd}`;
                insertText(yyyymmdd);
                addClickEffect(topDateBtn);
            });
            topDateSection.appendChild(topDateBtn);

            layout.appendChild(topDateSection);

            const sections = [
                {
                    category: 'First Touch',
                    items: [
                        'First Touch Call',
                        'First Touch Whatsapp',
                        'First Touch Email',
                        'First Touch Telegram',
                        'First Touch WeChat / Send WeChat Request'
                    ]
                },
                {
                    category: 'Follow Up',
                    items: [
                        'Follow Up Call',
                        'Follow Up Whatsapp',
                        'Follow Up Email',
                        'Follow Up Telegram',
                        'Follow Up WeChat'
                    ]
                },
                {
                    category: 'Response',
                    items: [
                        'No Answer',
                        'No longer interested to study',
                        'Busy, call back later',
                        'Not showing any interest',
                        'Not interested, hung up on me',
                        'Cannot speak English',
                        'Cannot afford / want to study for free only',
                        'No ringing',
                        'Cannot be dialed',
                        'Invalid number / cannot be dialed',
                        'Number dialed not responding / unavailable atm',
                        'Out of coverage area',
                        'Number dialed busy',
                        'Powered off / switched off',
                        'Background too noisy, call back later',
                        "Don't have enough credit to make / receive call",
                        "Can't understand what he / she talking",
                        "Answered but don't want to talk at all",
                        "Line breaking, call back later",
                        "Not interested to study in Malaysia",
                        "Program not offer",
                        "Not meeting entry requirement"
                    ]
                },
                {
                    category: 'Remarks',
                    items: [
                        'Looking for job = Job',
                        'Program not offered = PNO',
                        'Fully funded = FF',
                        'Not keen to study in Malaysia = NIM',
                        'Can’t understand english = Eng',
                        'Financial concern = FC',
                        'Agent enquiry = Agent',
                        'Don’t meet requirement = DMR',
                        'No response at all (3 days) = No Reply',
                        'Never send inquiry / didn’t mean to send inquiry = No Enquiry',
                        'Invalid contact number = Invalid',
                        'Duplicate with IO/DND/WA = Duplicate',
                        "Didn’t show interest during nurturing stage / hung up the call / refused to give docs = Not interested"
                    ]
                }
            ];

            const firstTwoContainer = document.createElement('div');
            firstTwoContainer.style.display = 'grid';
            firstTwoContainer.style.gridTemplateColumns = '1fr 1fr';
            firstTwoContainer.style.gap = '10px';

            sections.slice(0, 2).forEach(({ category, items }) => {
                const section = document.createElement('div');
                section.style.marginBottom = '10px';

                const header = document.createElement('div');
                header.textContent = category;
                header.style.fontWeight = 'bold';
                header.style.fontSize = '13px';
                header.style.marginBottom = '5px';
                header.style.color = '#fff';
                header.style.textAlign = 'center';
                section.appendChild(header);

                const itemContainer = document.createElement('div');
                itemContainer.style.display = 'flex';
                itemContainer.style.flexDirection = 'column';
                itemContainer.style.gap = '5px';

                items.forEach((label) => {
                    const splitted = label.split(' = ');
                    const displayText = splitted[0];
                    const insertValue = splitted[1] || splitted[0];

                    const item = document.createElement('div');
                    item.textContent = displayText;
                    item.style.cursor = 'pointer';
                    item.style.marginBottom = '3px';
                    item.style.backgroundColor = '#555';
                    item.style.padding = '5px';
                    item.style.borderRadius = '3px';
                    item.style.fontSize = '12px';
                    item.style.color = '#fff';
                    item.style.textAlign = 'center';
                    item.style.display = 'flex';
                    item.style.alignItems = 'center';
                    item.style.justifyContent = 'center';

                    if (label === 'Follow Up WeChat') {
                        item.style.height = '37.5px';
                    }

                    item.addEventListener('click', () => {
                        insertText(insertValue);
                        addClickEffect(item);
                    });
                    itemContainer.appendChild(item);
                });

                section.appendChild(itemContainer);
                firstTwoContainer.appendChild(section);
            });

            layout.appendChild(firstTwoContainer);

            const responseSection = sections[2];
            const responseContainer = document.createElement('div');
            responseContainer.style.marginTop = '10px';

            const responseHeader = document.createElement('div');
            responseHeader.textContent = responseSection.category;
            responseHeader.style.fontWeight = 'bold';
            responseHeader.style.fontSize = '13px';
            responseHeader.style.marginBottom = '5px';
            responseHeader.style.color = '#fff';
            responseHeader.style.textAlign = 'center';
            responseContainer.appendChild(responseHeader);

            const responseItemContainer = document.createElement('div');
            responseItemContainer.style.display = 'grid';
            responseItemContainer.style.gridTemplateColumns = '1fr 1fr';
            responseItemContainer.style.gap = '5px';

            responseSection.items.forEach((label) => {
                const splitted = label.split(' = ');
                const displayText = splitted[0];
                const insertValue = splitted[1] || splitted[0];

                const item = document.createElement('div');
                item.textContent = displayText;
                item.style.cursor = 'pointer';
                item.style.marginBottom = '3px';
                item.style.backgroundColor = '#555';
                item.style.padding = '5px';
                item.style.borderRadius = '3px';
                item.style.fontSize = '12px';
                item.style.color = '#fff';
                item.style.textAlign = 'center';
                item.style.display = 'flex';
                item.style.alignItems = 'center';
                item.style.justifyContent = 'center';

                item.addEventListener('click', () => {
                    insertText(insertValue);
                    addClickEffect(item);
                });
                responseItemContainer.appendChild(item);
            });

            responseContainer.appendChild(responseItemContainer);
            layout.appendChild(responseContainer);

            const remarksSection = sections[3];
            const remarksContainer = document.createElement('div');
            remarksContainer.style.marginTop = '10px';

            const remarksHeader = document.createElement('div');
            remarksHeader.textContent = remarksSection.category;
            remarksHeader.style.fontWeight = 'bold';
            remarksHeader.style.fontSize = '13px';
            remarksHeader.style.marginBottom = '5px';
            remarksHeader.style.color = '#fff';
            remarksHeader.style.textAlign = 'center';
            remarksContainer.appendChild(remarksHeader);

            const remarksItemContainer = document.createElement('div');
            remarksItemContainer.style.display = 'grid';
            remarksItemContainer.style.gridTemplateColumns = '1fr 1fr';
            remarksItemContainer.style.gap = '5px';

            remarksSection.items.forEach((label) => {
                const splitted = label.split(' = ');
                const displayText = splitted[0];
                const insertValue = splitted[1] || splitted[0];

                const item = document.createElement('div');
                item.textContent = displayText;
                item.style.cursor = 'pointer';
                item.style.marginBottom = '3px';
                item.style.backgroundColor = '#555';
                item.style.padding = '5px';
                item.style.borderRadius = '3px';
                item.style.fontSize = '12px';
                item.style.color = '#fff';
                item.style.textAlign = 'center';
                item.style.display = 'flex';
                item.style.alignItems = 'center';
                item.style.justifyContent = 'center';
                item.style.width = '100%';

                if (displayText.includes('Didn’t show interest during nurturing stage')) {
                    item.style.gridColumn = '1 / span 2';
                }

                item.addEventListener('click', () => {
                    insertText(insertValue);
                    addClickEffect(item);
                });
                remarksItemContainer.appendChild(item);
            });

            remarksContainer.appendChild(remarksItemContainer);
            layout.appendChild(remarksContainer);

            const miscHeader = document.createElement('div');
            miscHeader.textContent = 'Miscellaneous';
            miscHeader.style.fontWeight = 'bold';
            miscHeader.style.fontSize = '14px';
            miscHeader.style.color = '#fff';
            miscHeader.style.textAlign = 'center';
            miscHeader.style.marginTop = '10px';
            layout.appendChild(miscHeader);

            function createDateButton(buttonLabel, insertedPrefix) {
                const b = document.createElement('div');
                b.textContent = buttonLabel;
                b.style.cursor = 'pointer';
                b.style.margin = '5px 0';
                b.style.backgroundColor = '#555';
                b.style.padding = '8px';
                b.style.borderRadius = '3px';
                b.style.fontSize = '13px';
                b.style.color = '#fff';
                b.style.textAlign = 'center';
                b.style.display = 'inline-block';
                b.style.width = '100%';

                b.addEventListener('click', () => {
                    const now = new Date();
                    const dd = String(now.getDate()).padStart(2, '0');
                    const mm = String(now.getMonth() + 1).padStart(2, '0');
                    const yyyy = now.getFullYear();
                    const finalDateStr = insertedPrefix + ' ' + dd + '/' + mm + '/' + yyyy;
                    insertText(finalDateStr);
                    addClickEffect(b);
                });
                return b;
            }

            const btnFirstTouch = createDateButton('First Touch (1) (Date)', '(1)');
            const btnSecondTouch = createDateButton('Second Touch (2) (Date)', '(2)');
            const btnThirdTouch = createDateButton('Third Touch (3) (Date)', '(3)');
            const btnForthTouch = createDateButton('Forth+ Touch (4+) (Date)', '(4+)');

            const btnLastTouch = document.createElement('div');
            btnLastTouch.textContent = 'Last Touch (Date)';
            btnLastTouch.style.cursor = 'pointer';
            btnLastTouch.style.margin = '5px 0';
            btnLastTouch.style.backgroundColor = '#555';
            btnLastTouch.style.padding = '8px';
            btnLastTouch.style.borderRadius = '3px';
            btnLastTouch.style.fontSize = '13px';
            btnLastTouch.style.color = '#fff';
            btnLastTouch.style.textAlign = 'center';
            btnLastTouch.style.display = 'inline-block';
            btnLastTouch.style.width = '100%';

            btnLastTouch.addEventListener('click', () => {
                const now = new Date();
                const dd = String(now.getDate()).padStart(2, '0');
                const mm = String(now.getMonth() + 1).padStart(2, '0');
                const yyyy = now.getFullYear();
                const finalDateStr = dd + '/' + mm + '/' + yyyy;
                insertText(finalDateStr);
                addClickEffect(btnLastTouch);
            });

            layout.appendChild(btnFirstTouch);
            layout.appendChild(btnSecondTouch);
            layout.appendChild(btnThirdTouch);
            layout.appendChild(btnForthTouch);
            layout.appendChild(btnLastTouch);
        }

        function renderAutofillView() {
            if (!isAuthenticated) {
                renderLoginPanel();
                return;
            }
            const setDateSection = document.createElement('div');
            setDateSection.style.marginBottom = '10px';

            const setDateTitle = document.createElement('div');
            setDateTitle.textContent = 'Set Due Date';
            setDateTitle.style.fontWeight = 'bold';
            setDateTitle.style.fontSize = '14px';
            setDateTitle.style.marginBottom = '5px';
            setDateTitle.style.color = '#fff';
            setDateTitle.style.textAlign = 'center';
            setDateSection.appendChild(setDateTitle);

            let isCalendarOpen = false;
            const setDateBtn = document.createElement('button');
            setDateBtn.textContent = '📅 Set Date';
            setDateBtn.style.width = '100%';
            setDateBtn.style.padding = '10px';
            setDateBtn.style.backgroundColor = '#555';
            setDateBtn.style.color = '#fff';
            setDateBtn.style.cursor = 'pointer';
            setDateBtn.style.borderRadius = '3px';
            setDateBtn.style.fontSize = '12px';
            setDateBtn.style.border = 'none';
            setDateBtn.addEventListener('click', () => {
                if (isCalendarOpen) return;
                isCalendarOpen = true;
                setDateBtn.style.display = 'none';
                const dateInput = document.createElement('input');
                dateInput.type = 'date';
                dateInput.value = getDueDate();
                dateInput.style.width = '100%';
                dateInput.style.padding = '10px';
                dateInput.style.backgroundColor = '#444';
                dateInput.style.color = '#fff';
                dateInput.style.border = '1px solid #777';
                dateInput.style.borderRadius = '3px';
                dateInput.style.fontSize = '12px';
                setDateSection.appendChild(dateInput);
                try {
                    dateInput.focus();
                    dateInput.showPicker();
                } catch (e) {
                    console.warn('showPicker not supported, user must click input to open calendar:', e);
                }
                dateInput.addEventListener('change', () => {
                    const selectedDate = dateInput.value;
                    if (selectedDate && /^\d{4}-\d{2}-\d{2}$/.test(selectedDate)) {
                        localStorage.setItem('crm_due_date', selectedDate);
                    }
                    dateInput.remove();
                    setDateBtn.style.display = 'block';
                    isCalendarOpen = false;
                });
                dateInput.addEventListener('blur', () => {
                    dateInput.remove();
                    setDateBtn.style.display = 'block';
                    isCalendarOpen = false;
                });
                dateInput.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') {
                        dateInput.remove();
                        setDateBtn.style.display = 'block';
                        isCalendarOpen = false;
                    }
                });
            });
            setDateSection.appendChild(setDateBtn);
            layout.appendChild(setDateSection);

            const firstTouchSection = document.createElement('div');
            firstTouchSection.style.marginTop = '10px';

            const firstTouchHeader = document.createElement('div');
            firstTouchHeader.textContent = 'First Touch';
            firstTouchHeader.style.fontWeight = 'bold';
            firstTouchHeader.style.fontSize = '14px';
            firstTouchHeader.style.marginBottom = '5px';
            firstTouchHeader.style.color = '#fff';
            firstTouchHeader.style.textAlign = 'center';
            firstTouchSection.appendChild(firstTouchHeader);

            const firstTouchContainer = document.createElement('div');
            firstTouchContainer.style.display = 'grid';
            firstTouchContainer.style.gridTemplateColumns = '1fr 1fr';
            firstTouchContainer.style.gap = '5px';

            const firstTouchButtons = [
                { text: '1st Touch Call No Answer', handler: runFirstTouchCall, color: '#555555' },
                { text: '1st Touch WhatsApp', handler: runFirstTouchWhatsApp, color: '#555555' },
                { text: '1st Touch Call FF/FC', handler: runFirstTouchFFFC, color: '#555555' },
                { text: '1st Touch Call Not Interested', handler: () => runFirstTouchSet1("Not interested to study at the moment"), color: '#555555' },
                { text: '1st Touch Call Not Match', handler: () => runFirstTouchSet1("Program not offer"), color: '#555555' },
                { text: '1st Touch Call X English', handler: () => runFirstTouchSet1("Cannot speak english"), color: '#555555' },
                { text: '1st Touch Call Invalid', handler: () => runFirstTouchSet1("Invalid number / Cannot be dialed"), color: '#555555' },
                { text: '1st Touch No Ringing', handler: runFirstTouchNoRinging, color: '#555555' },
                { text: '1st Touch Switched Off', handler: runFirstTouchSwitchedOff, color: '#555555' },
                { text: '1st Touch X Requirement', handler: runFirstTouchXRequirement, color: '#555555' }
            ];

            firstTouchButtons.forEach(({ text, handler, color }) => {
                const btn = document.createElement('button');
                btn.textContent = text;
                btn.style.padding = '8px';
                btn.style.backgroundColor = color;
                btn.style.color = '#fff';
                btn.style.cursor = 'pointer';
                btn.style.borderRadius = '3px';
                btn.style.fontSize = '12px';
                btn.style.border = 'none';
                btn.style.textAlign = 'center';
                btn.addEventListener('click', async () => {
                    await handler();
                    addClickEffect(btn);
                });
                firstTouchContainer.appendChild(btn);
            });

            firstTouchSection.appendChild(firstTouchContainer);
            layout.appendChild(firstTouchSection);

            const followUpSection = document.createElement('div');
            followUpSection.style.marginTop = '10px';

            const followUpHeader = document.createElement('div');
            followUpHeader.textContent = 'Follow Up';
            followUpHeader.style.fontWeight = 'bold';
            followUpHeader.style.fontSize = '14px';
            followUpHeader.style.marginBottom = '5px';
            followUpHeader.style.color = '#fff';
            followUpHeader.style.textAlign = 'center';
            followUpSection.appendChild(followUpHeader);

            const followUpContainer = document.createElement('div');
            followUpContainer.style.display = 'grid';
            followUpContainer.style.gridTemplateColumns = '1fr 1fr';
            followUpContainer.style.gap = '5px';

            const followUpButtons = [
                { text: 'To FU Call', handler: runFUCall, color: '#555555' },
                { text: 'To FU WhatsApp', handler: runFUWhatsApp, color: '#555555' }
            ];

            followUpButtons.forEach(({ text, handler, color }) => {
                const btn = document.createElement('button');
                btn.textContent = text;
                btn.style.padding = '8px';
                btn.style.backgroundColor = color;
                btn.style.color = '#fff';
                btn.style.cursor = 'pointer';
                btn.style.borderRadius = '3px';
                btn.style.fontSize = '12px';
                btn.style.border = 'none';
                btn.style.textAlign = 'center';
                btn.addEventListener('click', async () => {
                    await handler();
                    addClickEffect(btn);
                });
                followUpContainer.appendChild(btn);
            });

            followUpSection.appendChild(followUpContainer);
            layout.appendChild(followUpSection);

            const lostInvalidSection = document.createElement('div');
            lostInvalidSection.style.marginTop = '10px';

            const lostInvalidHeader = document.createElement('div');
            lostInvalidHeader.textContent = 'Follow Up & To Lost / Invalid';
            lostInvalidHeader.style.fontWeight = 'bold';
            lostInvalidHeader.style.fontSize = '14px';
            lostInvalidHeader.style.marginBottom = '5px';
            lostInvalidHeader.style.color = '#fff';
            lostInvalidHeader.style.textAlign = 'center';
            lostInvalidSection.appendChild(lostInvalidHeader);

            const lostInvalidContainer = document.createElement('div');
            lostInvalidContainer.style.display = 'grid';
            lostInvalidContainer.style.gridTemplateColumns = '1fr 1fr';
            lostInvalidContainer.style.gap = '5px';

            const lostInvalidButtons = [
                { text: 'FF/FC 1', handler: runFFFC1, color: '#555555' },
                { text: 'FF/FC 2', handler: runFFFC2, color: '#555555' },
                { text: 'No Answer 1', handler: runNoAnswer1, color: '#555555' },
                { text: 'No Answer 2', handler: runNoAnswer2, color: '#555555' },
                { text: 'Not Interested 1', handler: () => runSet1("Not interested to study at the moment"), color: '#555555' },
                { text: 'Not Interested 2', handler: () => runSet2("Not Interested"), color: '#555555' },
                { text: 'Not Match 1', handler: () => runSet1("Program not offer"), color: '#555555' },
                { text: 'Not Match 2', handler: () => runSet2("PNO"), color: '#555555' },
                { text: 'English 1', handler: () => runSet1("Cannot speak english"), color: '#555555' },
                { text: 'English 2', handler: () => runSet2("ENG"), color: '#555555' },
                { text: 'Invalid 1', handler: () => runSet1("Invalid number / Cannot be dialed"), color: '#555555' },
                { text: 'Invalid 2', handler: runInvalid2, color: '#555555' }
            ];

            lostInvalidButtons.forEach(({ text, handler, color }) => {
                const btn = document.createElement('button');
                btn.textContent = text;
                btn.style.padding = '8px';
                btn.style.backgroundColor = color;
                btn.style.color = '#fff';
                btn.style.cursor = 'pointer';
                btn.style.borderRadius = '3px';
                btn.style.fontSize = '12px';
                btn.style.border = 'none';
                btn.style.textAlign = 'center';
                btn.addEventListener('click', async () => {
                    await handler();
                    addClickEffect(btn);
                });
                lostInvalidContainer.appendChild(btn);
            });

            lostInvalidSection.appendChild(lostInvalidContainer);
            layout.appendChild(lostInvalidSection);
        }

        (async () => {
            const isValidSession = await checkSession();
            if (isValidSession) {
                renderMainUI();
            } else {
                renderLoginPanel();
            }
        })();
})();
