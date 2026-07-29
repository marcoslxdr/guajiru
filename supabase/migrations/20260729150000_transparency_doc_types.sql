-- Expand transparency document types for active transparency sections
ALTER TABLE public.transparency_documents
  DROP CONSTRAINT IF EXISTS transparency_documents_doc_type_check;

ALTER TABLE public.transparency_documents
  ADD CONSTRAINT transparency_documents_doc_type_check
  CHECK (doc_type IN ('ata', 'estatuto', 'relatório', 'estrutura', 'remuneração'));
