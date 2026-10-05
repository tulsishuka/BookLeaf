import React, { useEffect, useState } from 'react';
import {
  Send,
  ChevronDown,
  Globe,
  CheckCircle2,
} from 'lucide-react';

interface Book {
  _id: string;
  title: string;
  isbn?: string;
  status?: string;
}

interface AttachedFile {
  name: string;
  size: string;
}

const API_URL =
  import.meta.env.VITE_API_URL ||
  'https://bookleaf-1-backend.onrender.com';

const SubmitQuery: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState('');
  const [category, setCategory] = useState(
    'Royalty & Payout Timelines'
  );
  const [subject, setSubject] = useState(
    'Royalty payment not received for Q3'
  );
  const [description, setDescription] = useState(
    'I published my book 4 months ago and still haven\'t received any royalty payout. My dashboard shows over 420 copies sold between paperback and Kindle versions. Can someone please clarify the payout timeline?'
  );
    useState<AttachedFile | null>({
      name: 'screenshot_royalty_dashboard.png',
      size: '360 KB • Image Proof Attached',
    });
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const categories = [
    'Royalty & Payout Timelines',
    'Typesetting & Layout Formatting',
    'Cover Embossing & Foil Proofs',
    'ISBN & Legal Deposit Filing',
    'Author Copies & Distribution Logistics',
  ];

 

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          setErrorMessage(
            'Please login again to submit a support query.'
          );
          setLoadingBooks(false);
          return;
        }

        const response = await fetch(
          `${API_URL}/api/auth/author/dashboard`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || 'Failed to load books'
          );
        }

        setBooks(data.books || []);

        if (data.books?.length > 0) {
          setSelectedBook(data.books[0]._id);
        }
      } catch (error) {
        console.error('Fetch books error:', error);

        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'Unable to load your books.'
        );
      } finally {
        setLoadingBooks(false);
      }
    };

    fetchBooks();
  }, []);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setSuccessMessage('');
    setErrorMessage('');

    if (!subject.trim()) {
      setErrorMessage('Please enter a subject.');
      return;
    }

    if (!description.trim()) {
      setErrorMessage(
        'Please enter a detailed description.'
      );
      return;
    }

    if (description.trim().length < 50) {
      setErrorMessage(
        'Description must contain at least 50 characters.'
      );
      return;
    }

    try {
      setSubmitting(true);

      const token = localStorage.getItem('token');

      if (!token) {
        setErrorMessage(
          'Your session has expired. Please login again.'
        );
        return;
      }

      const response = await fetch(
        `${API_URL}/api/tickets`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bookId: selectedBook || undefined,
            subject: subject.trim(),
            description: description.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            'Failed to submit support query.'
        );
      }

      setSuccessMessage(
        `Query submitted successfully. Ticket ID: ${data.ticket.id}`
      );

      setSubject('');
      setDescription('');

      console.log(
        'Ticket created:',
        data.ticket
      );

      console.log(
        'Initial message:',
        data.initialMessage
      );
    } catch (error) {
      console.error(
        'Submit ticket error:',
        error
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong while submitting your query.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FDFBF7] px-4 py-6 sm:px-6 lg:px-10 font-sans">
      <div className="w-full space-y-8">

        <div className="bg-[#9c6a3a] text-white rounded-lg p-6 lg:p-8 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl relative z-10">
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-white leading-tight">
              How can we help with your book?
            </h1>

            <p className="text-xs lg:text-sm text-gray-300 leading-relaxed">
              Tell us what you need, and our publishing team and dedicated managing editor will review your folio promptly.
            </p>
          </div>

          <div className="w-28 h-28 opacity-15 pointer-events-none absolute right-4 bottom-2 text-gray-900">
            <Globe className="w-full h-full stroke-[1]" />
          </div>
        </div>

        {successMessage && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg p-4 text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-xs font-medium">
            {errorMessage}
          </div>
        )}
        <div className="w-full">
          <form
            onSubmit={handleSubmit}
            className="w-full bg-[#F8F5EE] border border-gray-200/80 rounded-lg p-5 sm:p-6 lg:p-8 space-y-6"
          >

            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <label className="text-xs font-bold text-[#9c6a3a]">
                  1. Which book is this inquiry about?{' '}
                  <span className="text-red-500">*</span>
                </label>

               
              </div>

              <div className="relative">
                <select
                  value={selectedBook}
                  onChange={(e) =>
                    setSelectedBook(e.target.value)
                  }
                  disabled={loadingBooks}
                  className="w-full bg-[#F8F5EE] border border-[#9c6a3a] rounded px-3.5 py-2.5 text-xs hover:text-[#9c6a3a] font-medium focus:outline-none focus:ring-1 focus:ring-black appearance-none pr-10 disabled:opacity-60"
                >
                  {loadingBooks ? (
                    <option>
                      Loading your books...
                    </option>
                  ) : books.length === 0 ? (
                    <option value="">
                      No books found
                    </option>
                  ) : (
                    books.map((book) => (
                      <option
                        key={book._id}
                        value={book._id}
                      >
                        {book.title}
                        {book.isbn
                          ? ` (ISBN ${book.isbn})`
                          : ''}
                        {book.status
                          ? ` - ${book.status}`
                          : ''}
                      </option>
                    ))
                  )}
                </select>

                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <label className="text-xs font-bold text-[#9c6a3a]">
                  2. Category / Auto-routing classification
                </label>

               
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {categories.map((cat) => {
                  const isSelected =
                    category === cat;

                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() =>
                        setCategory(cat)
                      }
                      className={`px-3 py-1.5 rounded text-xs font-medium transition border ${
                        isSelected
                          ? 'bg-[#9c6a3a] text-white '
                          : 'bg-[#F2EDE4] text-gray-700 hover:bg-[#E8E1D7] border-[#CFC7BB]'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <label className="text-xs font-bold text-[#9c6a3a]">
                  3. Subject Line
                </label>

              
              </div>

              <input
                type="text"
                value={subject}
                onChange={(e) =>
                  setSubject(e.target.value)
                }
                placeholder="Brief summary of your query..."
                className="w-full bg-[#FDFBF7] border border-[#9c6a3a] rounded px-3.5 py-2.5 text-xs text-gray-800 font-medium focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <label className="text-xs font-bold text-[#9c6a3a]">
                  4. Detailed Description
                </label>

                <span className="text-[10px] font-mono text-gray-400">
                  {description.length} Characters (Min 50 required)
                </span>
              </div>

              <textarea
                rows={5}
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                placeholder="Please describe your query with details like page numbers, transaction IDs, or layout specs..."
                className="w-full bg-[#FDFBF7] border border-[#9c6a3a] rounded p-3.5 text-xs text-gray-800 leading-relaxed focus:outline-none focus:ring-1 focus:ring-black resize-y"
              />

             
            </div>

            <div className="pt-4 border-t border-[#D8D0C5] flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="submit"
                disabled={submitting || loadingBooks}
                className="w-full sm:w-auto px-6 py-3 bg-[#9c6a3a] h disabled:bg-gray-500 text-white  rounded text-xs font-semibold flex items-center justify-center gap-2 transition shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />

                <span>
                  {submitting
                    ? 'Submitting...'
                    : 'Submit Editorial Query'}
                </span>
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};
export default SubmitQuery;

