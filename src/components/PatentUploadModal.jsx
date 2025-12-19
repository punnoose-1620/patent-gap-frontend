import { useState } from 'react';
import { X, Upload, FileText, Shield, MessageSquare } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const PatentUploadModal = ({ isOpen, onClose, onComplete }) => {
  const [step, setStep] = useState('upload');
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' or 'patentId'
  const [projectName, setProjectName] = useState('');
  const [patentNumber, setPatentNumber] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [context, setContext] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleUpload = () => {
    if (!projectName) return;
    if (activeTab === 'upload' && !selectedFile) return;
    if (activeTab === 'patentId' && !patentNumber) return;
    setStep('context');
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleContextSubmit = () => {
    setLoading(true);
    
    // Simulate processing
    setTimeout(() => {
      // Call onComplete with mock project data
      onComplete({
        id: Date.now().toString(),
        name: projectName,
        patentNumber,
        context,
        status: 'processing'
      });
      resetModal();
    }, 1000);
  };

  const resetModal = () => {
    setStep('upload');
    setActiveTab('upload');
    setProjectName('');
    setPatentNumber('');
    setSelectedFile(null);
    setContext('');
    setLoading(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">New Patent Analysis</h2>
              <p className="text-sm text-muted-foreground">
                {step === 'upload' && 'Step 1: Upload Patent'}
                {step === 'context' && 'Step 2: Add Context'}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {step === 'upload' && (
            <div className="space-y-6">
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-foreground mb-1">Secure Upload</div>
                  <div className="text-xs text-muted-foreground">
                    ISO/SOC2 Compliant. Your data is encrypted and secure.
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g., Foldable Display Hinge Analysis"
                  className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-background text-foreground"
                />
              </div>

              {/* Tabs */}
              <Tabs defaultValue="upload" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload" className="gap-2">
                    <Upload className="w-4 h-4" />
                    Upload File
                  </TabsTrigger>
                  <TabsTrigger value="patentId" className="gap-2">
                    <FileText className="w-4 h-4" />
                    Patent ID
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="upload" className="space-y-4 mt-6">
                  <label
                    htmlFor="file-upload"
                    className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary hover:bg-primary/5 transition cursor-pointer block"
                  >
                    <Upload className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    {selectedFile ? (
                      <>
                        <div className="text-sm font-medium text-foreground mb-1">
                          {selectedFile.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </div>
                        <div className="text-xs text-primary mt-2">Click to change file</div>
                      </>
                    ) : (
                      <>
                        <div className="text-sm font-medium text-foreground mb-1">
                          Click to upload or drag and drop
                        </div>
                        <div className="text-xs text-muted-foreground">
                          PDF or Patent Portfolio (Max 50MB)
                        </div>
                      </>
                    )}
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept=".pdf"
                      onChange={handleFileChange}
                    />
                  </label>
                </TabsContent>

                <TabsContent value="patentId" className="space-y-4 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Enter Patent Number
                    </label>
                    <input
                      type="text"
                      value={patentNumber}
                      onChange={(e) => setPatentNumber(e.target.value)}
                      placeholder="e.g., US10203040"
                      className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition font-mono text-lg bg-background text-foreground"
                    />
                    <div className="mt-2 text-xs text-muted-foreground">
                      We'll automatically fetch patent details from USPTO
                    </div>
                  </div>

                  <div className="bg-muted/50 border border-border rounded-lg p-4">
                    <div className="text-xs font-medium text-foreground mb-2">Supported Formats:</div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div>• US Patents: US10203040, US-10203040-B2</div>
                      <div>• EP Patents: EP1234567, EP-1234567-A1</div>
                      <div>• WO Patents: WO2023123456, WO-2023/123456</div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {step === 'context' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-4">
                  <MessageSquare className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Put the Armor on the Warrior
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Help our AI understand your patent better. Provide context about the core novelty,
                      defensive goals, or specific technical elements you want to focus on.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {activeTab === 'upload' ? 'Uploaded File' : 'Patent Number'}
                </label>
                <div className="px-4 py-3 bg-muted border border-border rounded-lg text-sm text-foreground">
                  {activeTab === 'upload' ? (
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" />
                      <span>{selectedFile?.name || 'No file selected'}</span>
                    </div>
                  ) : (
                    <span className="font-mono">{patentNumber}</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Context Description
                </label>
                <textarea
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  rows={6}
                  placeholder="Example: Focus on the specific hinge mechanism for foldable displays. The novelty lies in the dual-axis rotation system with friction reduction coating. We should look for material overlaps in competing devices, particularly in the smartphone and tablet markets."
                  className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none bg-background text-foreground"
                />
                <div className="mt-2 text-xs text-muted-foreground">
                  Be specific about technical details, target markets, and key differentiators
                </div>
              </div>

              <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                <div className="text-sm font-medium text-foreground mb-2">AI Refinement Questions</div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <span className="font-medium">Q:</span>
                    <span>Should we also analyze specific material compositions?</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-medium">Q:</span>
                    <span>Are there particular jurisdictions you're concerned about?</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-border flex items-center justify-between">
          <button
            onClick={step === 'context' ? () => setStep('upload') : handleClose}
            className="px-6 py-2 text-foreground hover:bg-muted rounded-lg font-medium transition"
          >
            {step === 'context' ? 'Back' : 'Cancel'}
          </button>
          <button
            onClick={step === 'upload' ? handleUpload : handleContextSubmit}
            disabled={
              loading || 
              (step === 'upload' && (
                !projectName || 
                (activeTab === 'upload' && !selectedFile) ||
                (activeTab === 'patentId' && !patentNumber)
              ))
            }
            className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : step === 'upload' ? 'Continue' : 'Start Analysis'}
          </button>
        </div>
      </div>
    </div>
  );
};

