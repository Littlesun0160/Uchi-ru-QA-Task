import { test, expect } from '@playwright/test';
import {WidgetPage} from "./widget.page";

test.describe('Uchi.ru widget ', () => {
  let widgetPage: WidgetPage;

  test.beforeEach(async ({page}) => {
    widgetPage = new WidgetPage(page);

    // open uchi.ru main page
    await page.goto('/');

    // close cookies popup
    await page.locator('._UCHI_COOKIE__button:visible').click();
  });

  test('widget body is visible after opening', async ({page}) => {
    await widgetPage.openWidget();

    await expect(widgetPage.getWidgetBody()).toBeVisible();
  });

  test('opens feedback form from popular article', async ({ page }) => {
    await widgetPage.openWidget();

    const articles = await widgetPage.getPopularArticles();
    expect(articles.length).toBeGreaterThan(0);

    await articles[0].click();

    await widgetPage.clickWriteToUs();

    expect(await widgetPage.getTitle()).toEqual('Связь с поддержкой');
  });

  test('opens article from search', async ({ page }) => {
    // Подготовка тестовых данных
    const testArticleName = 'Как начать заниматься?';

    // Открыть виджет
    await widgetPage.openWidget();

    // Ввести в поле "Поиск" тестовое название статьи
    await widgetPage.searchArticleByName(testArticleName);
    const foundArticlesNames = await widgetPage.getSearchResultsNames();
    expect(foundArticlesNames.length).toBeGreaterThan(0);

    // Ассерт на существование искомой статьи в списке найденных статей
    expect(foundArticlesNames).toContain(testArticleName);

    // Открыть найденную статью
    await widgetPage.openArticleBySearchName(testArticleName);
    await page.waitForTimeout(1000);
    
    // Ассерт на соответствие заголовка статьи ожидаемому
    expect(await widgetPage.getArticleTitle()).toEqual(testArticleName);
  });
});
