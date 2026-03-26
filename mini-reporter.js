// mini-reporter.js
export default class MiniReporter {
  onBegin(config, suite) {
    console.log(`\n🚀 MEMULAKAN AUTOMASI: ${suite.allTests().length} Test Senario`);
    console.log(`==================================================`);
  }

  // Fungsi ini akan dipanggil setiap kali satu 'test.step' selesai
  onStepEnd(test, result, step) {
    // Kita tapis supaya hanya tunjuk 'test.step' yang kita tulis sahaja
    // Elakkan tunjuk step dalaman Playwright (seperti 'beforeAll' atau 'fixture')
    if (step.category === 'test.step') {
      const stepIcon = step.error ? '❌' : '  ├╼ ✅';
      const duration = (step.duration / 1000).toFixed(2);
      console.log(`${stepIcon} ${step.title} (${duration}s)`);
    }
  }

  onTestEnd(test, result) {
    console.log(`--------------------------------------------------`);
    const statusIcon = result.status === 'passed' ? '✅ TEST BERJAYA' : '❌ TEST GAGAL';
    console.log(`${statusIcon}: ${test.title}`);
    
    if (result.error) {
      console.log(`   ⚠ Ralat: ${result.error.message.split('\n')[0]}`);
    }
    console.log(`==================================================\n`);
  }

  async onEnd(result) {
    const summary = result.status === 'passed' ? 'SEMUA TEST LULUS' : 'ADA TEST GAGAL';
    console.log(`📊 RINGKASAN AKHIR: ${summary}`);
    console.log(`📅 TARIKH: ${new Date().toLocaleString()}\n`);
  }
}