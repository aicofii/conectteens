document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.interest-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('bg-purple-700');
        btn.classList.toggle('text-white');
        btn.classList.toggle('bg-purple-100');
        btn.classList.toggle('text-purple-700');
      });
    });
  
    const form = document.getElementById('joinForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // 在此处添加表单验证与提交逻辑
      alert('注册成功！');
    });
  });