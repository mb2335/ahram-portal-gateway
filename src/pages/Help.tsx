import { Apple, Smartphone, ArrowDown, CheckCircle, Info } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { InstallPWA } from "@/components/shared/InstallPWA";

export function Help() {
  const { language } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">
        {language === 'en' ? 'Installation Guide' : '설치 가이드'}
      </h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        {/* iOS Installation */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Apple className="h-6 w-6" />
            <h2 className="text-xl font-semibold">
              {language === 'en' ? 'iOS Installation' : 'iOS 설치'}
            </h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="bg-muted rounded-full p-2">
                <Info className="h-4 w-4" />
              </div>
              <p>
                {language === 'en' 
                  ? 'Open this website in Safari browser' 
                  : 'Safari 브라우저에서 이 웹사이트를 열어주세요'}
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-muted rounded-full p-2">
                <ArrowDown className="h-4 w-4" />
              </div>
              <p>
                {language === 'en'
                  ? 'Tap the Share button (box with arrow) at the bottom of the screen'
                  : '화면 하단의 공유 버튼을 탭하세요 (화살표가 있는 상자)'}
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-muted rounded-full p-2">
                <CheckCircle className="h-4 w-4" />
              </div>
              <p>
                {language === 'en'
                  ? 'Select "Add to Home Screen" from the options'
                  : '옵션에서 "홈 화면에 추가"를 선택하세요'}
              </p>
            </div>
          </div>
        </Card>

        {/* Android Installation */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Smartphone className="h-6 w-6" />
            <h2 className="text-xl font-semibold">
              {language === 'en' ? 'Android Installation' : '안드로이드 설치'}
            </h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="bg-muted rounded-full p-2">
                <Info className="h-4 w-4" />
              </div>
              <p>
                {language === 'en'
                  ? 'Open this website in Chrome browser'
                  : 'Chrome 브라우저에서 이 웹사이트를 열어주세요'}
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-muted rounded-full p-2">
                <ArrowDown className="h-4 w-4" />
              </div>
              <p>
                {language === 'en'
                  ? 'Click on the Install option near the address bar'
                  : '주소 표시줄 근처의 설치 옵션을 클릭하세요'}
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-muted rounded-full p-2">
                <CheckCircle className="h-4 w-4" />
              </div>
              <p>
                {language === 'en'
                  ? 'Follow the installation prompts that appear and the app will be installed automatically'
                  : '표시되는 설치 메시지를 따르면 앱이 자동으로 설치됩니다'}
              </p>
            </div>

            <div className="text-sm text-muted-foreground">
              {language === 'en'
                ? "If you don't see the install option, click the button below:"
                : "설치 옵션이 보이지 않는 경우 아래 버튼을 클릭하세요:"}
            </div>
            <InstallPWA />
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Help;
