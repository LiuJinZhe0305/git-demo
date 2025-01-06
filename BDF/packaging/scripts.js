// scripts.js

document.addEventListener('DOMContentLoaded', function() {
    const featureButtons = document.querySelectorAll('.feature-btn');
    const featureContent = document.getElementById('feature-content');
    const contentSections = document.querySelectorAll('.content-section');

    // 处理功能按钮点击事件
    featureButtons.forEach(button => {
        button.addEventListener('click', function() {
            const feature = this.getAttribute('data-feature');

            // 隐藏所有内容
            contentSections.forEach(section => {
                section.classList.add('hidden');
            });

            // 显示对应的内容
            const activeSection = document.getElementById(feature);
            if (activeSection) {
                activeSection.classList.remove('hidden');
                // 滚动到功能内容区域
                activeSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 功能1表单提交处理
    const userInputForm = document.getElementById('userInputForm');
    const userInput = document.getElementById('userInput');
    const messageDiv = document.getElementById('message');
    const nextFeatureBtn = document.getElementById('nextFeatureBtn');

    userInputForm.addEventListener('submit', function(event) {
        event.preventDefault(); // 防止表单默认提交行为

        const inputValue = userInput.value.trim();

        // 输入验证逻辑
        // 验证规则：不为空
        if (inputValue === '') {
            messageDiv.textContent = '输入不能为空，请重新输入。';
            messageDiv.style.color = 'red';
            return;
        }

        // 如果输入符合要求
        messageDiv.textContent = '输入验证成功！';
        messageDiv.style.color = 'green';

        // 将输入内容传递给后端
        // 这里假设后端接收POST请求的URL为 '/api/submit-feature1'
        fetch('/api/submit-feature1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ unusualItem: inputValue })
        })
        .then(response => {
            if (response.ok) {
                return response.json(); // 假设后端返回JSON数据
            } else {
                throw new Error('网络响应异常');
            }
        })
        .then(data => {
            console.log('成功:', data);
            // 这里可以根据后端的响应数据进行进一步处理

            // 显示前往功能2的按钮
            nextFeatureBtn.classList.remove('hidden');
        })
        .catch((error) => {
            console.error('错误:', error);
            messageDiv.textContent = '提交失败，请稍后再试。';
            messageDiv.style.color = 'red';
        });
    });

    // 点击前往功能2按钮时，跳转到功能2的内容区域
    nextFeatureBtn.addEventListener('click', function() {
        // 隐藏当前功能内容
        const activeSection = document.getElementById('feature1');
        activeSection.classList.add('hidden');

        // 清除表单和消息
        userInputForm.reset();
        messageDiv.textContent = '';

        // 隐藏导航按钮
        nextFeatureBtn.classList.add('hidden');

        // 显示功能2的内容区域
        const feature2Section = document.getElementById('feature2');
        feature2Section.classList.remove('hidden');
        feature2Section.scrollIntoView({ behavior: 'smooth' });
    });
});
